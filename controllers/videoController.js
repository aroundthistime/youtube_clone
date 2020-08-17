import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";
import stringSimilarity from "string-similarity";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).populate("creator").sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req; // = const searchingBy = query.term
  let videos = [];
  try {
    //checks exact same words only ignoring upper or lower cases.
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    }).populate("creator");
  } catch (error) {
    console.log(error);
  }
  try {
    //check words with similarities
    const allVideos = await Video.find({});
    allVideos.forEach((video) => {
      if (
        stringSimilarity.compareTwoStrings(video.title, searchingBy) >= 0.3 &&
        !videos.find((v) => v.id === video.id)
      ) {
        videos.push(video);
      }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos }); // if the value is same as the key, you can just send the name of the key only (then it will automatically think that the key has a value which is a variable of a same name of the key)
};

export const category = async (req, res) => {
  const {
    params: { category },
    query: { sort },
  } = req;
  let videos;
  try {
    if (sort == 1) {
      // sort by most popular - most views come first
      videos = await Video.find({ category })
        .populate("creator")
        .sort({ views: -1 });
    } else if (sort == 2) {
      // sort by date(oldest)
      videos = await Video.find({ category }).populate("creator");
    } else {
      // sort by date(newest) - default
      videos = await Video.find({ category })
        .populate("creator")
        .sort({ _id: -1 });
    }
    res.render("category", { pageTitle: category, category, videos });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getHistory = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.populate({
    path: "history",
    model: "Video",
    populate: { path: "creator", model: "User" },
  });
  let videos = [];
  for (let i = 0; i < user.history.length; i++) {
    const historyVideo = await Video.findById(user.history[i]).populate(
      "creator"
    );
    videos.push(historyVideo);
  }
  // user.history.forEach(async (video) => {
  //   const historyVideo = await Video.findById(video).populate("creator");
  //   console.log(historyVideo);
  //   videos.push(historyVideo);
  // });
  const category = "History";
  res.render("category", {
    pageTitle: category,
    category,
    videos,
  });
};

export const getVideoUpload = (req, res) =>
  res.render("uploadVideo", { pageTitle: "Upload" });

export const postVideoUpload = async (req, res) => {
  const {
    body: { title, description, category },
    file: { path },
  } = req;
  //upload and save video, after it finishes uploading, redirect user to the videodetail page of the video
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    category,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate({
        path: "creator",
        model: "User",
        populate: { path: "blockedComments", model: "Comment" },
      })
      .populate({
        path: "comments",
        model: "Comment",
        populate: { path: "creator", model: "User" },
      });
    const category = video.category;
    let videosRecommended = [];
    const sameCategory = await Video.find({ category })
      .populate("creator")
      .sort({ views: -1 }); //should change to real recommendations.
    sameCategory.some((v) => {
      if (video.id !== v.id) {
        videosRecommended.push(v);
      }
      return videosRecommended.length >= 5;
    });
    const popularVideos = await (
      await Video.find({}).populate("creator").sort({ _id: -1 })
    ).filter(
      (v) =>
        !videosRecommended.find(
          (videoRecommended) =>
            videoRecommended.id === v.id || v.id === video.id
        )
    );
    popularVideos.some((v) => {
      videosRecommended.push(v);
      return videosRecommended.length >= 10;
    });
    if (req.user) {
      // add the video to user's history
      const user = await User.findById(req.user._id);
      const index = user.history.indexOf(video);
      if (index > -1) {
        user.history.splice(index, 1);
      }
      user.history.push(video);
      if (user.history.length > 50) {
        user.history.shift();
      }
      user.save();
    }
    res.render("videoDetail", {
      pageTitle: video.title,
      video,
      videosRecommended,
    });
  } catch (error) {
    console.log(error);
    res.render("userDetail", { pageTitle: "Video not Found", user: null });
  }
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (req.user && video.creator._id == req.user.id) {
      res.render("editVideo", { pageTitle: `[Edit] ${video.title}`, video });
    } else {
      res.render("editVideo", { pageTitle: "Video Edit Error", video: null });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description }); //remember! it is _id not id how things are saved in the mongoose db
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (req.user && video.creator._id == req.user.id) {
      await Video.findByIdAndRemove(id);
      res.render(routes.home);
    } else {
      res.render("editVideo", { pageTitle: "Video Delete Error", video: null });
    }
  } catch (error) {}
  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postEditComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
      isEdited: true,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  const {
    params: { id },
    body: { commentId },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    if (commentId === "") {
      // if the comment is just created, not by pug but by javascript create element function => so it doesnt have id
      const commentToDelete = video.comments[video.comments.length - 1];
      console.log(commentToDelete.id);
      await Comment.findByIdAndRemove(commentToDelete.id);
      video.comments.pop();
    } else {
      // when the comment is created before loading the page, and has its id in html
      await Comment.findByIdAndRemove(commentId);
      const filteredVideoComments = await video.comments.filter(
        (comment) => comment._id != commentId
      );
      video.comments = filteredVideoComments;
    }
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postBlockComment = async (req, res) => {
  const {
    body: { commentId },
    user,
  } = req;
  try {
    console.log(user.id);
    console.log(user._id);
    const currentUser = await User.findById(user.id);
    console.log(currentUser);
    currentUser.blockedComments.push(commentId);
    currentUser.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
