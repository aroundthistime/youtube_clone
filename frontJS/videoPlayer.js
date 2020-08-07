const videoPlayer = document.getElementById("jsVideoPlayer");
const video = videoPlayer.querySelector("video");
const progressBar = videoPlayer.querySelector(".video__player__progress-bar");
const videoPlayerEffect = videoPlayer.querySelector(".video__player__effect");
const videoPlayerEffectIcon = videoPlayerEffect.querySelector("i");
const videoPlayerEffectAnimation = [
  { opacity: "1", zIndex: "0", transform: "none" },
  { opacity: "0", transform: "scale(1.5)" },
  { zIndex: "-1", transform: "none" },
];
let videoPlayerControls;
let playPause;
let playPauseIcon;
let playPauseName;
let volumeBtn;

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

const checkVideoEnd = () => {
  if (video.ended) {
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.remove("fa-pause");
    playPauseIcon.classList.add("fa-undo");
    playPauseName.innerText = "Replay";
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

const setVideoPlayerControlsWidth = () => {
  videoPlayerControls.style.width = `${parseFloat(
    window.getComputedStyle(videoPlayer).getPropertyValue("width")
  )}px`;
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
  setProgressBarCurrent();
  playVideo();
};

const handleMute = (e) => {
  //fix more details because there can be many states of volumes
  const volumeControlName = volumeBtn.querySelector(".control-name");
  const volumeIcon = volumeBtn.querySelector("i");
  if (video.muted) {
    volumeIcon.classList.remove("fa-volume-mute");
    volumeIcon.classList.add("fa-volume-down");
    volumeControlName.innerText = "Mute";
    volumeControlName.style.left = "-15px";
  } else {
    volumeIcon.classList.remove("fa-volume-down");
    volumeIcon.classList.add("fa-volume-mute");
    volumeControlName.innerText = "Unmute";
    volumeControlName.style.left = "-21px";
  }
  video.muted = !video.muted;
};

const handleVideoPlayer = () => {
  videoPlayerControls = videoPlayer.querySelector(".video__player__controls");
  videoPlayerControls.style.display = "block";
  playPause = videoPlayerControls.querySelector(".play-pause");
  playPauseIcon = playPause.querySelector("i");
  playPauseName = playPause.querySelector(".control-name");
  volumeBtn = videoPlayer.querySelector(".volume-btn");
  getVideoLength(); //get the total length of video and set innerText
  setVideoPlayerControlsWidth(); //first when the page loads
  setProgressBarCurrent(); //color the progress bar red as the amount that is watched
  handlePlayPause(); //automatically start video when page is loaded
  volumeBtn.addEventListener("click", handleMute);
  playPause.addEventListener("click", handlePlayPause);
  video.addEventListener("click", handlePlayPause);
  progressBar.addEventListener("click", jumpProgressBar);
  window.addEventListener("resize", setVideoPlayerControlsWidth); //when the page is resize and the width of videoBlock changes
};

if (videoPlayer) {
  video.addEventListener("loadeddata", handleVideoPlayer);
}
