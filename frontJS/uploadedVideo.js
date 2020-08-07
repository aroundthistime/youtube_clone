const uploadedVideoSection = document.querySelector(".uploaded-videos");
const uploadedVideos = uploadedVideoSection.querySelectorAll(".videoBlock");

const handleUploadedVideosWidth = (e) => {
  uploadedVideos.forEach((video) => {
    const videoBlockWidth = parseFloat(
      window.getComputedStyle(video).getPropertyValue("width")
    );
    const videoThumbnail = video.querySelector(".videoBlock__thumbnail");
    videoThumbnail.style.width = `${videoBlockWidth}px`;
    videoThumbnail.style.height = `${(videoBlockWidth * 9) / 16}px`;
  });
};

handleUploadedVideosWidth(null);
window.addEventListener("resize", handleUploadedVideosWidth);
