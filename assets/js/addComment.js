import axios from "axios";

const addCommentForm = document.getElementById("jsFormAddComment");
const commentsCount = document.getElementById("jsCommentsCount");
const userImg = document.querySelector(".comment-profile");
const hiddenUserName = document.querySelector(".loggedUserName"); // a hidden div with logged User name in it
const hiddenUserId = document.querySelector(".loggedUserId");
const confirm = document.querySelector(".confirm");
const overlay = document.querySelector(".overlay");
let commentInput;
let addCommentCancelBtn;
let addCommentCommitBtn;
let commentMoreBtns;
let currentCommentMoreBox;
let showCommentMoreBox = false;
let commentMoreTabs;
let clickedComment; //The comment that the user is trying to delete, block...
let commentJob; // 0 === delete, 1 === block, 2 === edit
let isEditting = false; //shows whether current input is editting a comment, or just committing a new one

const BLOCKED_COMMENTS_LS = "blockedComments";
let blocked_comments_list = [];

const isloggedIn = () => {
  if (userImg.tagName === "IMG") {
    return true;
  } else {
    return false;
  }
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const a1 = document.createElement("a");
  const a2 = document.createElement("a");
  a1.href = a2.href = `/users/${hiddenUserId.innerText}`;
  const commentProfile = document.createElement("img");
  commentProfile.classList.add("comment-profile");
  commentProfile.src = userImg.src;
  const commentBox = document.createElement("div");
  commentBox.classList.add("comment-box");
  const commentTitle = document.createElement("div");
  commentTitle.classList.add("comment-title");
  const commentCreator = document.createElement("span");
  commentCreator.classList.add("comment-creator");
  commentCreator.innerText = hiddenUserName.innerText;
  const commentDate = document.createElement("span");
  commentDate.classList.add("comment-date");
  commentDate.classList.add("light");
  commentDate.innerText = new Date().toString().substring(4, 21);
  const commentContent = document.createElement("div");
  commentContent.classList.add("comment-content");
  commentContent.innerText = comment;
  const commentMoreBoxDiv = document.createElement("div");
  commentMoreBoxDiv.classList.add("comment-moreBox");
  commentMoreBoxDiv.classList.add("no-drag");
  commentMoreBoxDiv.classList.add("hidden");
  const commentMoreTabDelete = document.createElement("div");
  commentMoreTabDelete.classList.add("comment-moreTab");
  commentMoreTabDelete.classList.add("comment-more__delete");
  commentMoreTabDelete.addEventListener("click", handleCommentMoreTabClick);
  const moreTabDeleteIcon = document.createElement("i");
  moreTabDeleteIcon.classList.add("fas");
  moreTabDeleteIcon.classList.add("fa-trash");
  const moreTabDeleteSpan = document.createElement("span");
  moreTabDeleteSpan.innerText = "Delete";
  commentMoreTabDelete.appendChild(moreTabDeleteIcon);
  commentMoreTabDelete.appendChild(moreTabDeleteSpan);
  const commentMoreTabEdit = document.createElement("div");
  commentMoreTabEdit.classList.add("comment-moreTab");
  commentMoreTabEdit.classList.add("comment-more__edit");
  commentMoreTabEdit.addEventListener("click", handleCommentMoreTabClick);
  const moreTabEditIcon = document.createElement("i");
  moreTabEditIcon.classList.add("fas");
  moreTabEditIcon.classList.add("fa-pen");
  const moreTabEditSpan = document.createElement("span");
  moreTabEditSpan.innerText = "Edit";
  commentMoreTabEdit.appendChild(moreTabEditIcon);
  commentMoreTabEdit.appendChild(moreTabEditSpan);
  const commentMore = document.createElement("div");
  commentMore.classList.add("comment-more");
  commentMore.addEventListener("click", handleCommentMoreBtn);
  const icon = document.createElement("i");
  icon.classList.add("fas");
  icon.classList.add("fa-ellipsis-v");
  a1.appendChild(commentProfile);
  li.appendChild(a1);
  commentMore.appendChild(icon);
  a2.appendChild(commentCreator);
  commentTitle.appendChild(a2);
  commentTitle.appendChild(commentDate);
  commentBox.appendChild(commentTitle);
  commentBox.appendChild(commentContent);
  commentMoreBoxDiv.appendChild(commentMoreTabDelete);
  commentMoreBoxDiv.appendChild(commentMoreTabEdit);
  li.appendChild(commentBox);
  li.appendChild(commentMoreBoxDiv);
  li.appendChild(commentMore);
  const commentsList = document.getElementById("jsCommentsList");
  commentsList.prepend(li);
};

const increaseCommentsCount = () => {
  commentsCount.innerText = `${
    parseInt(commentsCount.innerText.split(" ")[0]) + 1
  } comments`;
};

const decreaseCommentsCount = () => {
  commentsCount.innerText = `${
    parseInt(commentsCount.innerText.split(" ")[0]) - 1
  } comments`;
};

const getVideoId = () => {
  let videoId = window.location.href.split("/videos/")[1];
  if (videoId.charAt(videoId.length - 1) === "?") {
    videoId = videoId.substring(0, videoId.length - 1);
  }
  return videoId;
};

const sendComment = async (comment) => {
  const videoId = getVideoId();
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

const sendEditedComment = async (comment) => {
  const videoId = getVideoId();
  const response = await axios({
    url: `/api/${videoId}/edit-comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status == 200) {
    addComment(comment);
    deleteComment(true);
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
    if (isEditting) {
      sendEditedComment(comment);
      isEditting = false;
    } else {
      sendComment(comment);
    }
  }
  commentInput.value = "";
  addCommentCommitBtn.classList.remove("abled");
};

const commitComment = (e) => {
  handleSubmit(null);
};

const cancelComment = (e) => {
  isEditting = false;
  commentInput.value = "";
};

const handleCommitBtn = (e) => {
  if (commentInput.value != "") {
    addCommentCommitBtn.classList.add("abled");
  } else {
    addCommentCommitBtn.classList.remove("abled");
  }
};

const handleCommentMoreBtn = (e) => {
  let clickedComment = e.target;
  while (clickedComment.tagName !== "LI") {
    clickedComment = clickedComment.parentNode;
  }
  currentCommentMoreBox = clickedComment.querySelector(".comment-moreBox");
  if (currentCommentMoreBox.style.display === "none") {
    showCommentMoreBox = true;
  } else {
    showCommentMoreBox = false;
  }
};

const handleCommentMoreBoxDisplay = (e) => {
  const commentMoreBoxes = document.querySelectorAll(".comment-moreBox");
  if (currentCommentMoreBox && showCommentMoreBox) {
    commentMoreBoxes.forEach((commentMoreBox) => {
      if (commentMoreBox != currentCommentMoreBox) {
        commentMoreBox.style.display = "none";
      }
    });
    currentCommentMoreBox.style.display = "block";
  } else {
    commentMoreBoxes.forEach((commentMoreBox) => {
      commentMoreBox.style.display = "none";
    });
  }

  currentCommentMoreBox = null;
  showCommentMoreBox = false;
};

const deleteCommentVisually = () => {
  clickedComment.parentNode.removeChild(clickedComment);
};

const deleteComment = async (afterEditting) => {
  const commentId = clickedComment.id; //actually delete comment from db
  const videoId = getVideoId();
  const response = await axios({
    url: `/api/${videoId}/delete-comment`,
    method: "POST",
    data: {
      commentId,
    },
  });
  if (response.status == 200) {
    deleteCommentVisually();
    if (!afterEditting) {
      decreaseCommentsCount();
    }
  }
};

const blockComment = async () => {
  deleteCommentVisually();
  if (isloggedIn()) {
    const commentId = clickedComment.id; //actually delete comment from db
    const response = await axios({
      url: `/api/block-comment`,
      method: "POST",
      data: {
        commentId,
      },
    });
    if (response.status === 200) {
      decreaseCommentsCount();
    }
  } else {
    //save blocked comments on local Storage
    blocked_comments_list.push(clickedComment.id);
    localStorage.setItem(
      BLOCKED_COMMENTS_LS,
      JSON.stringify(blocked_comments_list)
    );
  }
};

const editComment = () => {
  commentInput.value = clickedComment.querySelector(
    ".comment-content"
  ).innerText;
  document.querySelector(".video__title").scrollIntoView();
  handleCommitBtn();
  commentInput.focus();
  isEditting = true;
};

const executeCommentJob = (e) => {
  hideConfirm();
  if (commentJob === 0) {
    deleteComment(false);
  } else if (commentJob === 1) {
    blockComment();
  } else {
    editComment();
  }
};

const showConfirm = () => {
  overlay.style.display = "block";
  if (commentJob === 0) {
    confirm.querySelectorAll(".confirm__comment-job").forEach((span) => {
      span.innerText = "Delete";
    });
    confirm.querySelector(".confirm-button__approve").innerText = "DELETE";
  } else {
    confirm.querySelectorAll(".confirm__comment-job").forEach((span) => {
      span.innerText = "Block";
    });
    confirm.querySelector(".confirm-button__approve").innerText = "BLOCK";
  }
  confirm.style.display = "block";
};

const hideConfirm = (e) => {
  overlay.style.display = "none";
  confirm.style.display = "none";
};

const handleCommentMoreTabClick = (e) => {
  let clickedCommentMoreTab = e.target;
  while (!clickedCommentMoreTab.classList.contains("comment-moreTab")) {
    clickedCommentMoreTab = clickedCommentMoreTab.parentNode;
  }
  clickedComment = clickedCommentMoreTab.parentNode;
  while (clickedComment.tagName !== "LI") {
    clickedComment = clickedComment.parentNode;
  }
  if (clickedCommentMoreTab.classList.contains("comment-more__delete")) {
    commentJob = 0;
    showConfirm();
  } else if (clickedCommentMoreTab.classList.contains("comment-more__block")) {
    commentJob = 1;
    showConfirm();
  } else {
    commentJob = 2;
    executeCommentJob();
  }
};

const setCommentsCount = () => {
  commentsCount.innerText = `${
    document.getElementById("jsCommentsList").querySelectorAll("li").length
  } comments`;
};

const loadBlockComment__localStorage = () => {
  const blockedCommentsLS = localStorage.getItem(BLOCKED_COMMENTS_LS);
  let blockedCommentsCount_LS = 0;
  if (blockedCommentsLS !== null) {
    const parsedBlockedComments = JSON.parse(blockedCommentsLS);
    parsedBlockedComments.forEach((blockedCommentId) => {
      blocked_comments_list.push(blockedCommentId);
      document
        .getElementById("jsCommentsList")
        .querySelectorAll("li")
        .forEach((comment) => {
          if (comment.id === blockedCommentId) {
            blockedCommentsCount_LS += 1;
            clickedComment = comment;
            deleteComment();
          }
        });
    });
  }
};

function init() {
  setCommentsCount();
  loadBlockComment__localStorage();
  commentInput = addCommentForm.querySelector("input");
  addCommentCancelBtn = addCommentForm.querySelector(".addComment-cancel");
  addCommentCommitBtn = addCommentForm.querySelector(".addComment-commit");
  commentMoreBtns = document.querySelectorAll(".comment-more");
  commentMoreTabs = document.querySelectorAll(".comment-moreTab");
  addCommentForm.addEventListener("submit", handleSubmit);
  commentInput.addEventListener("input", handleCommitBtn);
  addCommentCommitBtn.addEventListener("click", commitComment);
  addCommentCancelBtn.addEventListener("click", cancelComment);
  commentMoreBtns.forEach((commentMoreBtn) => {
    commentMoreBtn.addEventListener("click", handleCommentMoreBtn);
  });
  document.body.addEventListener("click", handleCommentMoreBoxDisplay);
  commentMoreTabs.forEach((commentMoreTab) => {
    commentMoreTab.addEventListener("click", handleCommentMoreTabClick);
  });
  overlay.addEventListener("click", hideConfirm);
  confirm
    .querySelector(".confirm-button__cancel")
    .addEventListener("click", hideConfirm);
  confirm
    .querySelector(".confirm-button__approve")
    .addEventListener("click", executeCommentJob);
}

if (addCommentForm) {
  init();
}
