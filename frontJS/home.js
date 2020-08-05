const home = document.querySelector(".home__videos");

const videos = home.querySelectorAll(".videoBlock");

videos.forEach((video) => {
  const videoBlock__info = video.querySelector(".videoBlock__info");
  const videoBlockTitle = videoBlock__info.querySelector(".videoBlock__title");
  const videoBlockCreator = videoBlock__info.querySelector(
    ".videoBlock__creator-img"
  );
  const videoBlock_width = parseFloat(
    window.getComputedStyle(videoBlock__info).getPropertyValue("width")
  );
  const videoBlock__info_paddingRight = videoBlock_width / 14;
  videoBlock__info.style.paddingRight = `${videoBlock__info_paddingRight}px`;
  const videoBlockCreator_width = parseFloat(
    window.getComputedStyle(videoBlockCreator).getPropertyValue("width")
  );
  videoBlockTitle.style.width = `${
    videoBlock_width -
    videoBlock__info_paddingRight -
    15 -
    videoBlockCreator_width
  }px`;
});
