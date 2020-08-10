import axios from "axios";

const addCommentForm = document.getElementById("jsFormAddComment");
const commentsCount = document.getElementById("jsCommentsCount");
const userImg = document.querySelector(".comment-profile");
let commentInput;
let addCommentCancelBtn;
let addCommentCommitBtn;

const isloggedIn = () => {
  if (userImg.tagName === "IMG") {
    return true;
  } else {
    return false;
  }
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const commentBox = document.createElement("div");
  commentBox.classList.add("comment-box");
  const commentTitle = document.createElement("div");
  commentTitle.classList.add("comment-title");
  const commentDate = document.createElement("span");
  commentDate.classList.add("comment-date");
  commentDate.innerText = new Date().toString().substring(4, 21);
  const commentContent = document.createElement("div");
  commentContent.classList.add("comment-content");
  commentContent.innerText = comment;
  const commentMore = document.createElement("div");
  commentMore.classList.add("comment-more");
  const icon = document.createElement("i");
  icon.classList.add("fas");
  icon.classList.add("fa-ellipsis-v");
  commentMore.appendChild(icon);
  commentTitle.appendChild(commentDate);
  commentBox.appendChild(commentTitle);
  commentBox.appendChild(commentContent);
  li.appendChild(commentBox);
  li.appendChild(commentMore);
  const commentsList = document.getElementById("jsCommentsList");
  commentsList.prepend(li);
};

const increaseCommentsCount = () => {
  commentsCount.innerText = `${
    parseInt(commentsCount.innerText.split(" ")[0]) + 1
  } comments`;
};

const sendComment = async (comment) => {
  let videoId = window.location.href.split("/videos/")[1];
  if (videoId.charAt(videoId.length - 1) === "?") {
    videoId = videoId.substring(0, videoId.length - 1);
  }
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status == 200) {
    addComment(comment);
    increaseCommentsCount();
  }
};

const handleSubmit = (e) => {
  if (e) {
    e.preventDefault();
    if (!isloggedIn()) {
      alert("You need to login to leave a comment.");
      window.location.assign("/login");
    }
  }
  const comment = commentInput.value;
  if (comment != "") {
    sendComment(comment);
  }
  commentInput.value = "";
  addCommentCommitBtn.classList.remove("abled");
};

const commitComment = (e) => {
  handleSubmit(null);
};

const cancelComment = (e) => {
  commentInput.value = "";
};

const handleCommitBtn = (e) => {
  if (commentInput.value != "") {
    addCommentCommitBtn.classList.add("abled");
  } else {
    addCommentCommitBtn.classList.remove("abled");
  }
};

function init() {
  commentInput = addCommentForm.querySelector("input");
  addCommentCancelBtn = addCommentForm.querySelector(".addComment-cancel");
  addCommentCommitBtn = addCommentForm.querySelector(".addComment-commit");
  addCommentForm.addEventListener("submit", handleSubmit);
  commentInput.addEventListener("input", handleCommitBtn);
  addCommentCommitBtn.addEventListener("click", commitComment);
  addCommentCancelBtn.addEventListener("click", cancelComment);
}

if (addCommentForm) {
  init();
}
