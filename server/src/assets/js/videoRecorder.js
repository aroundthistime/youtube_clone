const recordContainer = document.getElementById("jsRecordContainer");
const recordVideoPreview = document.getElementById("jsRecordPreview");
const recordStartBtn = document.getElementById("jsRecordStartBtn");
const recordingBtns = document.querySelector(".record-btns--recording");
const recordPauseBtn = document.getElementById("jsRecordPauseBtn");
const recordResumeBtn = document.getElementById("jsRecordResumeBtn");
const recordStopBtn = document.getElementById("jsRecordStopBtn");

let streamObj;
let videoRecorder;
let recordChunks = [];

const alertRecordDisabled = (e) => {
  alert(
    "Video Record Disabled\n - Media Access Permission Denied\n권한 요청이 거부되어 비디오를 녹화할 수 없습니다."
  );
};

const handleVideoData = (e) => {
  if (e.data.size > 0) {
    recordChunks.push(e.data);
  }
};

const saveRecording = () => {
  const videoFile = new Blob(recordChunks, { type: "video/webm" }); // === const {data : videoFile} = event;
  const link = document.createElement("a");
  const url = URL.createObjectURL(videoFile);
  link.href = url;
  link.download = "YUTUBE Recorded.webm";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  recordChunks = [];
};

const startRecording = () => {
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
};

const pauseRecording = (e) => {
  videoRecorder.stop();
  recordPauseBtn.style.display = "none";
  recordResumeBtn.style.display = "block";
};

const resumeRecording = (e) => {
  videoRecorder.start();
  recordPauseBtn.style.display = "block";
  recordResumeBtn.style.display = "none";
};

const stopRecording = async () => {
  try {
    await videoRecorder.stop();
  } catch (error) {} //when you stop recording in the state of pause recording
  recordResumeBtn.style.display = "none";
  recordPauseBtn.style.display = "block";
  recordingBtns.style.display = "none";
  recordStartBtn.style.display = "block";
  setTimeout(saveRecording, 100);
  recordVideoPreview.srcObject = null;
};

const getRecordVideo = async (e) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1080, height: 607.5 },
    });
    streamObj = stream;
    recordVideoPreview.srcObject = stream;
    recordVideoPreview.muted = true;
    recordVideoPreview.play();
    videoRecorder = new MediaRecorder(streamObj);
    recordStartBtn.style.display = "none";
    recordingBtns.style.display = "flex";
    startRecording();
  } catch (error) {
    recordBtn.addEventListener("click", alertRecordDisabled);
  } finally {
    recordStartBtn.style.display = "none";
  }
};

if (recordContainer) {
  recordStartBtn.addEventListener("click", getRecordVideo);
  recordPauseBtn.addEventListener("click", pauseRecording);
  recordResumeBtn.addEventListener("click", resumeRecording);
  recordStopBtn.addEventListener("click", stopRecording);
}
