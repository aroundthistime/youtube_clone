const videoPlayer = document.getElementById("jsVideoPlayer");
const video = videoPlayer.querySelector("video");
const progressBar = videoPlayer.querySelector(".video__player__progress-bar");
const videoPlayerEffect = videoPlayer.querySelector(".video__player__effect");
const videoPlayerEffectIcon = videoPlayerEffect.querySelector("i");
const videoPlayerAutoplay = document.getElementById("autoplay");
const videoPlayerAutoplayCheckBox = document.getElementById("autoplayCheckbox");
const canvas = document.getElementById("canvas");
const videoPlayerEffectAnimation = [
  { opacity: "1", zIndex: "0", transform: "none" },
  { opacity: "0", transform: "scale(1.5)" },
  { zIndex: "-1", transform: "none" },
];
let videoPlayerControls;
let playPause; //playPause
let playPauseIcon;
let playPauseName;
let volumeBtn; //volume
let volumeIcon;
let volumeRange;
let settings; //settings
let settingsIcon;
let settingsMain;
let settingsCategories;
let settingsVisible = false;
let fullScreenBtn; //fullScreen
let isFullScreen = false;
let usingAutoplay = videoPlayerAutoplayCheckBox.checked; //나중에 다시
let showNextAutoPlayVideoCount = 0;
let nextVideoUrl;

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, { method: "POST" });
};

const setProgressBarCurrent = () => {
  const progressBarCurrent = progressBar.querySelector(
    ".progress-bar__current"
  );
  setInterval(function () {
    progressBar_width = parseFloat(
      window.getComputedStyle(progressBar).getPropertyValue("width")
    );
    progressBarCurrent.style.width = `${
      (progressBar_width * video.currentTime) / video.duration
    }px`;
  }, 100);
};

const playVideo = () => {
  video.play();
  getVideoCurrentTime(); //get the current time of video playing
  playPauseIcon.classList.remove("fa-play");
  playPauseIcon.classList.remove("fa-undo");
  playPauseIcon.classList.add("fa-pause");
  playPauseName.innerText = "Pause";
  playPauseName.style.left = "-15px";
};

const pauseVideo = () => {
  video.pause();
  playPauseIcon.classList.remove("fa-pause");
  playPauseIcon.classList.add("fa-play");
  playPauseName.innerText = "Play";
  playPauseName.style.left = "-12px";
};

const playPauseEffect = (isPlay) => {
  if (isPlay) {
    videoPlayerEffectIcon.classList.remove("fa-pause");
    videoPlayerEffectIcon.classList.add("fa-play");
    videoPlayerEffect.animate(videoPlayerEffectAnimation, 800);
  } else {
    videoPlayerEffectIcon.classList.add("fa-pause");
    videoPlayerEffectIcon.classList.remove("fa-play");
    videoPlayerEffect.animate(videoPlayerEffectAnimation, 800);
  }
};

const handlePlayPause = (e = null) => {
  if (
    playPauseIcon.classList.contains("fa-play") ||
    playPauseIcon.classList.contains("fa-undo")
  ) {
    try {
      if (playPauseIcon.classList.contains("fa-play") && e !== null) {
        playPauseEffect(true);
      }
      playVideo();
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      playPauseEffect(false);
      pauseVideo();
    } catch (error) {
      console.log(error);
    }
  }
};

const changeTimeFormat = (time) => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (time >= 3600) {
    hours = parseInt(time / 3600);
    time %= 3600;
    if (time >= 60) {
      minutes = parseInt(time / 60);
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    seconds = times % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  } else {
    minutes = parseInt(time / 60);
    seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }
};

const getVideoLength = () => {
  const videoLength = parseInt(video.duration);
  const timestampTotal = videoPlayerControls.querySelector(".timestamp-total");
  timestampTotal.innerText = changeTimeFormat(videoLength);
};

const hideNextAutoPlayVideo = () => {
  videoPlayerAutoplay.style.display = "none";
  showNextAutoPlayVideoCount += 1;
};

const handleAutoplayCancelBtnClick = (event) => {
  usingAutoplay = false;
  hideNextAutoPlayVideo();
};

const moveToNextVideo = (event) => {
  window.location = nextVideoUrl;
};

const showNextAutoPlayVideo = () => {
  showNextAutoPlayVideoCount += 1;
  const currentShowNextAutoPlayVideoCount = showNextAutoPlayVideoCount;
  const nextVideo = document
    .getElementById("recommends")
    .querySelector(".videoBlock");
  const nextVideoLink = nextVideo.querySelector(".videoDetailLink");
  const nextVideoTitle = nextVideo.querySelector(".videoBlock__title")
    .innerText;
  document.getElementById("autoplayNextVideoTitle").innerText = nextVideoTitle;
  const nextVideoCreator = nextVideo.querySelector(".videoBlock__creator")
    .innerText;
  document.getElementById(
    "autoplayNextVideoCreator"
  ).innerText = nextVideoCreator;
  const nextVideoThumbnail = nextVideo.querySelector(".videoBlock__thumbnail");
  if (nextVideoThumbnail.poster) {
    videoPlayerAutoplay.style.backgroundImage = `url(${nextVideoThumbnail.poster})`;
  } else {
    const context = canvas.getContext("2d");
    context.drawImage(nextVideoThumbnail, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL();
    videoPlayerAutoplay.style.background = `url(${dataUrl})`;
  }
  videoPlayerAutoplay.style.display = "flex";
  nextVideoUrl = nextVideoLink.href;
  setTimeout(function () {
    if (currentShowNextAutoPlayVideoCount == showNextAutoPlayVideoCount) {
      moveToNextVideo();
    }
  }, 10000);
};

const checkVideoEnd = () => {
  if (video.ended) {
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-undo");
    playPauseName.innerText = "Replay";
    if (
      usingAutoplay &&
      (!videoPlayerAutoplay.style.display ||
        videoPlayerAutoplay.style.display === "none")
    ) {
      showNextAutoPlayVideo();
    }
  }
};

const getVideoCurrentTime = () => {
  const videoSpeed = video.playbackRate;
  const setIntervalPeriod = 1000 / videoSpeed;
  setInterval(function () {
    const timestampCurrent = videoPlayerControls.querySelector(
      ".timestamp-current"
    );
    timestampCurrent.innerText = changeTimeFormat(parseInt(video.currentTime));
    checkVideoEnd();
  }, setIntervalPeriod);
};

const setVideoPlayerSectionsResize = (event) => {
  const videoPlayerWidth = `${parseFloat(
    window.getComputedStyle(videoPlayer).getPropertyValue("width")
  )}px`;
  const videoPlayerHeight = `${parseFloat(
    window.getComputedStyle(videoPlayer).getPropertyValue("height")
  )}px`;
  videoPlayerControls.style.width = videoPlayerWidth;
  videoPlayerAutoplay.style.width = videoPlayerWidth;
  videoPlayerAutoplay.style.height = videoPlayerHeight;
  videoPlayerAutoplay.style.backgroundSize = `${videoPlayerWidth} ${videoPlayerHeight}`;
  canvas.width = parseFloat(
    window.getComputedStyle(videoPlayer).getPropertyValue("width")
  );
  canvas.height = parseFloat(
    window.getComputedStyle(videoPlayer).getPropertyValue("height")
  );
};

const jumpProgressBar = (e) => {
  const progressBar_width = parseFloat(
    window.getComputedStyle(progressBar).getPropertyValue("width")
  );
  let percentage = e.offsetX / progressBar_width;
  if (percentage > 1) {
    percentage = 1;
  }
  video.currentTime = parseInt(video.duration * percentage);
  hideNextAutoPlayVideo();
  setProgressBarCurrent();
  playVideo();
};

const handleMute = (e) => {
  //fix more details because there can be many states of volumes
  const volumeControlName = volumeBtn.querySelector(".control-name");
  if (video.muted) {
    volumeRange.value = `${video.volume}`;
    volumeIcon.classList.remove("fa-volume-mute");
    if (video.volume > 0.5) {
      volumeIcon.classList.remove("fa-volume-down");
      volumeIcon.classList.add("fa-volume-up");
    } else {
      volumeIcon.classList.remove("fa-volume-up");
      volumeIcon.classList.add("fa-volume-down");
    }
    volumeControlName.innerText = "Mute";
    volumeControlName.style.left = "-15px";
  } else {
    volumeRange.value = "0";
    volumeIcon.classList.remove("fa-volume-down");
    volumeIcon.classList.remove("fa-volume-up");
    volumeIcon.classList.add("fa-volume-mute");
    volumeControlName.innerText = "Unmute";
    volumeControlName.style.left = "-21px";
  }
  video.muted = !video.muted;
};

const handleVolumeIcon = (volume) => {
  if (volume === 0) {
    video.volume = 0.5;
    handleMute(null);
  } else {
    video.volume = volume;
    video.muted = true;
    handleMute(null);
  }
};

const handleVolumeRange = (e) => {
  const volume = parseFloat(e.target.value);
  video.volume = volume;
  handleVolumeIcon(volume);
};

const hideSettings = () => {
  settings.querySelectorAll(".settingsBox").forEach((settingsBox) => {
    settingsBox.style.display = "none";
  });
};

const showSettings = () => {
  settingsMain.style.display = "block";
};

const showingSettings = () => {
  const settingsBoxes = Array.from(settings.querySelectorAll(".settingsBox"));
  return settingsBoxes.some((settingsBox) => {
    return settingsBox.style.display === "block";
  });
};

const handleSettings = (e) => {
  if (showingSettings()) {
    settingsVisible = false;
  } else {
    showSettings();
    settingsVisible = true;
  }
};

const getChosenSettingsCategory = (target) => {
  let chosenCategory;
  let chosenCategoryName;
  if (target.classList.contains("settings__main__category")) {
    chosenCategoryName = target.querySelector(".settings__category-column")
      .innerText;
  } else {
    if (target.tagName === "I" || target.tagName === "SPAN") {
      chosenCategoryName = target.parentNode.parentNode.querySelector(
        ".settings__category-column"
      ).innerText;
    } else {
      chosenCategoryName = target.parentNode.querySelector(
        ".settings__category-column"
      ).innerText;
    }
  }
  if (chosenCategoryName === "Playback Speed") {
    chosenCategory = settingsCategories[0];
  } // we'll add more if there becomes other categories of settings
  return chosenCategory;
};

const showSettingsMain = () => {
  settingsMain.animate(
    [
      { transform: "none", textIndent: "-10000px", width: "0" },
      { width: "260px", textIndent: "0" },
    ],
    250
  );
  settingsMain.style.display = "block";
  settingsMain.style.width = "260px";
  // setTimeout(function () {
  //   settingsMain.style.display = "none";
  // }, 250);
};

const hideSettingsMain = () => {
  settingsMain.animate(
    [{ transform: "none", textIndent: "-10000px" }, { width: "0" }],
    250
  );
  setTimeout(function () {
    settingsMain.style.display = "none";
  }, 250);
};

const showSettingsCategory = (chosenCategory) => {
  chosenCategory.style.display = "block";
  chosenCategory.animate(
    [
      { width: "0", textIndent: "-10000px" },
      { textIndent: 0, width: "260px" },
    ],
    250
  );
  chosenCategory.style.width = "260px";
};

const hideSettingsCategory = (chosenCategory) => {
  chosenCategory.animate(
    [
      { width: "260px", textIndent: "-10000px" },
      { textIndent: "0", width: "0px" },
    ],
    250
  );
  chosenCategory.style.width = "0px";
};

const moveToSettingsCategory = (e) => {
  settingsVisible = true;
  const chosenCategory = getChosenSettingsCategory(e.target);
  hideSettingsMain();
  setTimeout(showSettingsCategory(chosenCategory), 250);
};

const getvideoPlayerDOM = () => {
  videoPlayerControls = videoPlayer.querySelector(".video__player__controls");
  videoPlayerControls.style.display = "block";
  playPause = videoPlayerControls.querySelector(".play-pause");
  playPauseIcon = playPause.querySelector("i");
  playPauseName = playPause.querySelector(".control-name");
  volumeBtn = videoPlayer.querySelector(".volume-btn");
  volumeIcon = volumeBtn.querySelector("i");
  volumeRange = volumeBtn.querySelector(".volume-range");
  settings = videoPlayerControls.querySelector(".settings");
  settingsIcon = videoPlayerControls.querySelector(".fa-cog");
  settingsMain = settings.querySelector(".settings__main");
  settingsCategories = settings.querySelectorAll(".settings__category");
  fullScreenBtn = videoPlayerControls
    .querySelector(".expand")
    .querySelector("i");
};

const backToSettingsMain = (e) => {
  settingsVisible = true;
  let currentSettingsCategory;
  if (e.target === undefined) {
    currentSettingsCategory = e; //when e is not an event but an element, and you are going back to the settings main by selecting an option
  } else {
    currentSettingsCategory = e.target; //if e is an event, when you are going back with the left btn from settings category title
  }
  while (true) {
    if (currentSettingsCategory.classList.contains("settings__category")) {
      break;
    }
    currentSettingsCategory = currentSettingsCategory.parentNode;
  }
  hideSettingsCategory(currentSettingsCategory);
  showSettingsMain();
};

const setVideoSpeed = (speed) => {
  video.playbackRate = speed; //set the video Speed
};

const checkSelectedOption = (selectedOption) => {
  selectedOption.parentNode
    .querySelectorAll("i")
    .forEach((categoryOptionCheck) => {
      categoryOptionCheck.classList.remove("fa-check");
    });
  selectedOption.querySelector("i").classList.add("fa-check");
};

const selectSettingsOption = (e) => {
  let selectedOption = e.target;
  while (!selectedOption.classList.contains("category-option")) {
    selectedOption = selectedOption.parentNode;
  }
  if (selectedOption.parentNode.classList.contains("settings-speed")) {
    //add more
    if (selectedOption.innerText === "Normal") {
      setVideoSpeed(1);
    } else {
      setVideoSpeed(parseFloat(selectedOption.innerText));
    }
    settingsMain
      .querySelectorAll(".settings__main__category")[0]
      .querySelector(".settings__main__category-value").innerText =
      selectedOption.innerText;
  }
  checkSelectedOption(selectedOption);
  backToSettingsMain(selectedOption);
};

const unclickSettings = () => {
  if (!settingsVisible) {
    hideSettingsCategory;
    hideSettings();
  }
  settingsVisible = false;
};

const preventUnclickSettings = (event) => {
  settingsVisible = true;
};

const handleSettingsAutoPlayOptionClick = (event) => {
  settingsVisible = true;
  if (event.target.tagName !== "INPUT") {
    videoPlayerAutoplayCheckBox.checked = !videoPlayerAutoplayCheckBox.checked;
  }
  usingAutoplay = videoPlayerAutoplayCheckBox.checked;
};

const handleVideoScreen = (e) => {
  const fullScreenControlName = fullScreenBtn.parentNode.querySelector(
    ".control-name"
  );
  if (isFullScreen) {
    fullScreenBtn.classList.remove("fa-compress");
    fullScreenBtn.classList.add("fa-expand");
    fullScreenControlName.innerText = "Full Screen";
    fullScreenControlName.style.left = "-33px";
    document.exitFullscreen();
  } else {
    fullScreenBtn.classList.remove("fa-expand");
    fullScreenBtn.classList.add("fa-compress");
    fullScreenControlName.innerText = "Exit Full Screen";
    fullScreenControlName.style.left = "-60px";
    videoPlayer.requestFullscreen();
  }
  isFullScreen = !isFullScreen;
};

const handleVideoPlayer = () => {
  getvideoPlayerDOM(); // queryselect the dom elements necessary;
  getVideoLength(); //get the total length of video and set innerText
  setVideoPlayerSectionsResize(); //first when the page loads
  setProgressBarCurrent(); //color the progress bar red as the amount that is watched
  handlePlayPause(); //automatically start video when page is loaded
  volumeIcon.addEventListener("click", handleMute); //volume
  volumeRange.addEventListener("input", handleVolumeRange);
  video.volume = 0.5; //set the default of video volume to 0.5
  playPause.addEventListener("click", handlePlayPause); //play, pause
  video.addEventListener("click", handlePlayPause);
  settingsIcon.addEventListener("click", handleSettings); //settings
  document.addEventListener("click", unclickSettings);
  settingsMain
    .querySelector(".settings-speed.settings__main__category")
    .addEventListener("click", moveToSettingsCategory);
  settingsMain
    .querySelector(".settings-autoplay.settings__main__category")
    .addEventListener("click", handleSettingsAutoPlayOptionClick);
  settingsCategories.forEach((settingsCategory) => {
    settingsCategory.addEventListener("click", preventUnclickSettings);
    settingsCategory
      .querySelector(".fa-chevron-left")
      .addEventListener("click", backToSettingsMain);
    settingsCategory
      .querySelectorAll(".category-option")
      .forEach((categoryOption) => {
        categoryOption.addEventListener("click", selectSettingsOption);
      });
  });
  settingsMain.style.height = `${
    39.6 * settingsMain.querySelectorAll(".settings__main__category").length +
    16
  }px`;
  fullScreenBtn.addEventListener("click", handleVideoScreen);
  video.addEventListener("dblclick", handleVideoScreen);
  video.addEventListener("ended", registerView);
  progressBar.addEventListener("click", jumpProgressBar); //progress-bar
  videoPlayerAutoplay
    .querySelector(".autoplay__cancel")
    .addEventListener("click", handleAutoplayCancelBtnClick);
  videoPlayerAutoplay
    .querySelector(".autoplay__btn")
    .addEventListener("click", moveToNextVideo);
  videoPlayerAutoplay
    .querySelector(".autoplay__btn-icon")
    .addEventListener("click", moveToNextVideo);
  window.addEventListener("resize", setVideoPlayerSectionsResize); //when the page is resize and the width of videoBlock changes
};

if (videoPlayer) {
  video.addEventListener("loadeddata", handleVideoPlayer);
}
