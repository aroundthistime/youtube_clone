import routes from "../routes";
import Video from "../models/Video";
import stringSimilarity from "string-similarity";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
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
    });
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
  } = req;
  try {
    const videos = await Video.find({ category });
    res.render("category", { pageTitle: category, category, videos });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
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
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    const category = video.category;
    let videosRecommended = [];
    const sameCategory = await Video.find({ category }).sort({ views: -1 }); //should change to real recommendations.
    sameCategory.some((v) => {
      if (video.id !== v.id) {
        videosRecommended.push(v);
      }
      return videosRecommended.length >= 5;
    });
    const popularVideos = await (await Video.find({}).sort({ _id: -1 })).filter(
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
    res.render("videoDetail", {
      pageTitle: video.title,
      video,
      videosRecommended,
    });
  } catch (error) {
    res.redirect(routes.home); //해당 영상이 존재하지 않는다는 페이지 만들기?
  }
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `[Edit] ${video.title}`, video });
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
    await Video.findByIdAndRemove(id);
  } catch (error) {}
  res.redirect(routes.home);
};
