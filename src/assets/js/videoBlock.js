import axios from "axios";

const videoBlocks = document.querySelectorAll(".videoBlock");
const videoBlockActionNotice = document.getElementById(
  "videoBlockActionNotice"
);
const videoBlockActionResult = videoBlockActionNotice.querySelector(
  ".videoBlockActionResult"
);
const videoBlockActionLink = videoBlockActionNotice.querySelector(
  ".videoBlockActionLink"
);
const videoBlockActionTarget = videoBlockActionNotice.querySelector(
  ".videoBlockActionTarget"
);
let previouslyClickedVideoBlockActionBtn;
let videoBlockActionBoxShowing;
let showVideoBlockActionBox = false;
let videoBlockActionNoticeCount = 0;
let channelVideoObj = {}; //the key is the creator(channel)'s id, the value is a list of video DOMS created by the user

const isDoingVideoBlockJobFromHome = () => {
  if (
    window.location.href.includes("/users/") || //doing job from userDetail
    window.location.href.includes("/videos/") // doing job from videoDetail
  ) {
    return false;
  } else {
    return true;
  }
};

const hideVideoBlockActionNotice = () => {
  videoBlockActionNotice.animate(
    [{ transform: "translateY(-90px)" }, { transform: "none" }],
    300
  );
  setTimeout(() => {
    videoBlockActionNotice.style.transform = "none";
    videoBlockActionResult.innerText = "";
    videoBlockActionLink.innerHTML = "";
    videoBlockActionTarget.innerText = "";
  }, 300);
};

const showVideoBlockActionNotice = () => {
  videoBlockActionNoticeCount += 1;
  const currentVideoBlockActionNoticeCount = videoBlockActionNoticeCount;
  videoBlockActionNotice.animate(
    [{ transform: "none" }, { transform: "translateY(-90px)" }],
    300
  );
  videoBlockActionNotice.style.transform = "translateY(-90px)";
  setTimeout(function () {
    if (currentVideoBlockActionNoticeCount === videoBlockActionNoticeCount) {
      hideVideoBlockActionNotice();
    }
  }, 3000);
};

const showRequiresLogin = () => {
  videoBlockActionResult.innerText = "Requires Login for this job";
  videoBlockActionLink.innerHTML = "";
  const a = document.createElement("a");
  a.href = "/login";
  a.innerText = "LogIn";
  videoBlockActionLink.appendChild(a);
  showVideoBlockActionNotice();
};

const showVideoBlockJobFail = () => {
  videoBlockActionResult.innerText = "Request Failed.. Please try again";
  videoBlockActionLink.innerHTML = "";
  showVideoBlockActionNotice();
};

const removeWatchLater = async (videoId) => {
  let response;
  if (isDoingVideoBlockJobFromHome()) {
    response = await axios({
      url: `/api/${videoId}/undoWatchLater`,
      method: "POST",
    });
  } else {
    response = await axios({
      url: `../api/${videoId}/undoWatchLater`,
      method: "POST",
    });
  }
  if (response.status !== 200) {
    showVideoBlockJobFail();
  } else {
    return true;
  }
};

const undoWatchLater = (event) => {
  const videoId = videoBlockActionTarget.innerText;
  videoBlockActionNoticeCount += 1;
  hideVideoBlockActionNotice();
  removeWatchLater(videoId);
};

const showUnblockedChannelVideo = (video) => {
  const videoBlockRemovedBox = video.querySelector(".videoBlock--removed");
  videoBlockRemovedBox.style.display = "none"; //get rid of video hiding box
  const videoInfo = video.querySelector(".videoBlock__info");
  videoInfo.style.display = "grid"; //reshow video info
};

const handleUnblockedChannelVideo = (userId) => {
  channelVideoObj[userId].forEach((video) => {
    showUnblockedChannelVideo(video);
  });
};

const undoBlockChannel = async (event) => {
  let userId;
  if (event.target.classList.contains("videoBlockActionLink")) {
    // undo block channel by clicking undo from right bottom popup
    userId = videoBlockActionTarget.innerText;
  } else {
    // undo block channel by clicking undo button on the video
    let clickedVideoBlock = event.target;
    while (!clickedVideoBlock.classList.contains("videoBlock")) {
      clickedVideoBlock = clickedVideoBlock.parentNode;
    }
    userId = clickedVideoBlock
      .querySelector(".userDetailLink")
      .href.split("users/")[1];
  }
  videoBlockActionNoticeCount += 1;
  hideVideoBlockActionNotice();
  let response;
  if (isDoingVideoBlockJobFromHome()) {
    response = await axios({
      url: `api/${userId}/undoBlockChannel`,
      method: "POST",
    });
  } else {
    response = await axios({
      url: `../api/${userId}/undoBlockChannel`,
      method: "POST",
    });
  }

  if (response.status === 200) {
    handleUnblockedChannelVideo(userId);
  } else {
    showVideoBlockJobFail();
  }
};

const handleVideoBlockJobSuccess = (jobTarget, jobType) => {
  if (jobTarget) {
    // in this case, the popup has undo button
    videoBlockActionLink.innerText = "Undo";
    videoBlockActionTarget.innerText = jobTarget;
    if (jobType === "watchLater") {
      videoBlockActionResult.innerText = "Saved to Watch Later";
      videoBlockActionLink.addEventListener("click", undoWatchLater);
    } else {
      // block channel
      videoBlockActionResult.innerText = "The channel has been blocked";
      videoBlockActionLink.addEventListener("click", undoBlockChannel);
    }
  } else {
    if (jobType === "removeWatchLater") {
      videoBlockActionResult.innerText = "Removed from Watch Later";
    } else if (jobType === "removeHistory") {
      videoBlockActionResult.innerText = "Removed from Watch History";
    } else if (jobType === "blockChannel") {
      videoBlockActionResult.innerText = "Cannot block your own channel !";
    }
  }
  showVideoBlockActionNotice();
};

const handleWatchLater = async (videoId) => {
  if (!document.getElementById("loggedHeader")) {
    showRequiresLogin();
  } else {
    let response;
    if (isDoingVideoBlockJobFromHome()) {
      response = await axios({
        url: `/api/${videoId}/addWatchLater`,
        method: "POST",
      });
    } else {
      response = await axios({
        url: `../api/${videoId}/addWatchLater`,
        method: "POST",
      });
    }
    if (response.status == 200) {
      handleVideoBlockJobSuccess(videoId, "watchLater");
    } else {
      showVideoBlockJobFail();
    }
  }
};

const undoNoInterest = async (event) => {
  let response;
  if (document.getElementById("loggedHeader")) {
    if (event.target.parentNode.classList.contains("videoBlock--removed")) {
      let selectedVideoBlock = event.target;
      while (!selectedVideoBlock.classList.contains("videoBlock")) {
        selectedVideoBlock = selectedVideoBlock.parentNode;
      }
      const videoId = selectedVideoBlock
        .querySelector(".videoDetailLink")
        .href.split("videos/")[1];
      if (isDoingVideoBlockJobFromHome()) {
        response = await axios({
          url: `/api/${videoId}/undoNoInterest`,
          method: "POST",
        });
      } else {
        response = await axios({
          url: `../api/${videoId}/undoNoInterest`,
          method: "POST",
        });
      }
    }
  }
  if (response === undefined || response.status === 200) {
    let videoBlockRemovedBox = event.target;
    while (!videoBlockRemovedBox.classList.contains("videoBlock--removed")) {
      videoBlockRemovedBox = videoBlockRemovedBox.parentNode;
    }
    videoBlockRemovedBox.style.display = "none"; //get rid of video hiding box
    videoBlockRemovedBox.parentNode.querySelector(
      ".videoBlock__info"
    ).style.display = "grid"; //reshow video info
  } else {
    showVideoBlockJobFail();
  }
};

const hideNoInterestVideo = (video) => {
  const videoBlockRemovedBox = video.querySelector(".videoBlock--removed");
  videoBlockRemovedBox.style.display = "flex";
  videoBlockRemovedBox
    .querySelector(".videoBlock--removed-undo")
    .addEventListener("click", undoNoInterest);
  video.querySelector(".videoBlock__info").style.display = "none";
};

const handleNoInterest = async (video) => {
  if (document.getElementById("loggedHeader")) {
    const videoId = video
      .querySelector(".videoDetailLink")
      .href.split("videos/")[1];
    let response;
    if (isDoingVideoBlockJobFromHome()) {
      response = await axios({
        url: `/api/${videoId}/noInterest`,
        method: "POST",
      });
    } else {
      response = await axios({
        url: `../api/${videoId}/noInterest`,
        method: "POST",
      });
    }
    if (response.status == 200) {
      hideNoInterestVideo(video); // hide no interest video only if checking "not interested" is successfully done or the user isn't logged in
    } else {
      showVideoBlockJobFail();
    }
  } else {
    hideNoInterestVideo(video);
  }
};

const hideBlockedChannelVideo = (video) => {
  const videoBlockRemovedBox = video.querySelector(".videoBlock--removed");
  videoBlockRemovedBox.style.display = "flex";
  videoBlockRemovedBox
    .querySelector(".videoBlock--removed-undo")
    .addEventListener("click", undoBlockChannel);
  video.querySelector(".videoBlock__info").style.display = "none";
};

const matchChannelVideo = (userId) => {
  channelVideoObj[userId] = [];
  const videos = document.querySelectorAll(".videoBlock");
  videos.forEach((video) => {
    const creatorId = video
      .querySelector(".userDetailLink")
      .href.split("users/")[1];
    if (creatorId == userId) {
      //find the videos of the blocked channel
      channelVideoObj[userId].push(video);
    }
  });
};

const handleBlockedChannelVideo = (userId) => {
  if (!channelVideoObj[userId]) {
    matchChannelVideo(userId);
  }
  channelVideoObj[userId].forEach((video) => {
    hideBlockedChannelVideo(video);
  });
};

const blockChannel = async (userId) => {
  if (!document.getElementById("loggedHeader")) {
    showRequiresLogin();
  } else {
    let response;
    if (isDoingVideoBlockJobFromHome()) {
      response = await axios({
        url: `/api/${userId}/blockChannel`,
        method: "POST",
      });
    } else {
      response = await axios({
        url: `../api/${userId}/blockChannel`,
        method: "POST",
      });
    }
    if (response.status == 200) {
      handleVideoBlockJobSuccess(userId, "blockChannel");
      handleBlockedChannelVideo(userId);
    } else if (response.status === 202) {
      handleVideoBlockJobSuccess(false, "blockChannel");
    } else {
      showVideoBlockJobFail();
    }
  }
};

const removeHistory = async (video) => {
  const videoId = video
    .querySelector(".videoDetailLink")
    .href.split("videos/")[1];
  let response;
  if (isDoingVideoBlockJobFromHome()) {
    response = await axios({
      url: `/api/${videoId}/removeHistory`,
      method: "POST",
    });
  } else {
    response = await axios({
      url: `../api/${videoId}/removeHistory`,
      method: "POST",
    });
  }
  if (response.status === 200) {
    handleVideoBlockJobSuccess(false, "removeHistory");
    video.parentNode.removeChild(video);
  } else {
    showVideoBlockJobFail();
  }
};

const hideDeleteVideoConfirm = (event) => {
  const overlay = document.querySelector(".overlay");
  const confirmBox = document.querySelector(".confirm");
  overlay.style.display = "none";
  confirmBox.style.display = "none";
};

const confirmDeleteVideo = (videoId) => {
  const overlay = document.querySelector(".overlay");
  const confirmBox = document.querySelector(".confirm");
  const deleteVideoLink = document.getElementById("deleteVideoLink");
  deleteVideoLink.href = `/videos/${videoId}/delete`;
  overlay.style.display = "block";
  confirmBox.style.display = "block";
  overlay.addEventListener("click", hideDeleteVideoConfirm);
  confirmBox
    .querySelector(".confirm-button__cancel")
    .addEventListener("click", hideDeleteVideoConfirm);
};

const handleVideoBlockActionBoxClick = (event) => {
  let clicked = event.target;
  while (!clicked.classList.contains("videoBlock__action-box")) {
    if (clicked.classList.contains("videoBlock__action-bar")) {
      break;
    }
    clicked = clicked.parentNode;
  }
  if (clicked.classList.contains("videoBlock__action-box")) {
    // if you haven't clicked an option, but just clicked an empty space of action box
    showVideoBlockActionBox = true;
  } else {
    if (
      clicked.classList.contains("watchLater") ||
      clicked.classList.contains("removeWatchLater") ||
      clicked.classList.contains("deleteVideo")
    ) {
      const videoId = clicked.parentNode.parentNode
        .querySelector(".videoDetailLink")
        .href.split("videos/")[1];
      if (clicked.classList.contains("watchLater")) {
        handleWatchLater(videoId);
      } else if (clicked.classList.contains("removeWatchLater")) {
        if (removeWatchLater(videoId)) {
          let video = clicked;
          while (!video.classList.contains("videoBlock")) {
            // or video Recommended?
            video = video.parentNode;
          }
          video.parentNode.removeChild(video);
          handleVideoBlockJobSuccess(false, "removeWatchLater");
        }
      } else {
        confirmDeleteVideo(videoId);
      }
    } else {
      let video = clicked;
      while (!video.classList.contains("videoBlock")) {
        video = video.parentNode;
      }
      if (clicked.classList.contains("noInterest")) {
        handleNoInterest(video);
      } else if (clicked.classList.contains("blockCreator")) {
        const userId = video
          .querySelector(".userDetailLink")
          .href.split("users/")[1];
        blockChannel(userId);
      } else if (clicked.classList.contains("removeHistory")) {
        removeHistory(video);
      }
    }
  }
};

const handleVideoBlockActionBtnClick = (event) => {
  let clickedVideoBlockActionBtn = event.target;
  if (clickedVideoBlockActionBtn.tagName !== "DIV") {
    clickedVideoBlockActionBtn = clickedVideoBlockActionBtn.parentNode;
  }
  if (clickedVideoBlockActionBtn != previouslyClickedVideoBlockActionBtn) {
    if (videoBlockActionBoxShowing) {
      videoBlockActionBoxShowing.style.display = "none";
    }
    videoBlockActionBoxShowing = clickedVideoBlockActionBtn.parentNode.querySelector(
      ".videoBlock__action-box"
    );
    videoBlockActionBoxShowing.style.display = "block";
    videoBlockActionBoxShowing.addEventListener(
      "click",
      handleVideoBlockActionBoxClick
    );
    previouslyClickedVideoBlockActionBtn = clickedVideoBlockActionBtn;
    showVideoBlockActionBox = true;
    //just clicked something new
    //if there was something else that was showing hide that
    //show the new videoBLockactionBox that is currently clicked
    //change the clicke
  } else {
    //reclicked => just hide
    //previoulsy  = none
    showVideoBlockActionBox = false;
  }
};

const handleVideoBlockActionBtnUnclick = (event) => {
  if (!showVideoBlockActionBox && videoBlockActionBoxShowing) {
    videoBlockActionBoxShowing.style.display = "none";
    previouslyClickedVideoBlockActionBtn = null;
    videoBlockActionBoxShowing = null;
  }
  showVideoBlockActionBox = false;
};

if (videoBlocks.length) {
  videoBlocks.forEach((videoBlock) =>
    videoBlock
      .querySelector(".videoBlock__action-btn")
      .addEventListener("click", handleVideoBlockActionBtnClick)
  );
  document.body.addEventListener("click", handleVideoBlockActionBtnUnclick);
}
