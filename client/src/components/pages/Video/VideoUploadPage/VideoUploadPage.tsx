import React from 'react';
import VideoForm from '../../../partial/VideoForm/VideoForm';
import {useVideoUploadPage} from './useVideoUploadPage';
import './VideoUploadPage.scss';

const VideoUploadPage = () => {
  const {
    videoFileInputRef,
    thumbnailInputRef,
    titleInputRef,
    descriptionInputRef,
    categoryInputRef,
    onSubmit,
  } = useVideoUploadPage();
  return (
    <main className="video-upload">
      <VideoForm>
        <VideoForm.Title text="동영상 업로드" />
        <VideoForm.Form className="upload-form" onSubmit={onSubmit}>
          <VideoForm.VideoInput ref={videoFileInputRef} />
          <VideoForm.ThumbnailInput ref={thumbnailInputRef} />
          <VideoForm.TitleInput ref={titleInputRef} />
          <VideoForm.DescriptionInput ref={descriptionInputRef} />
          <VideoForm.CategoryInput ref={categoryInputRef} />
          <VideoForm.AlertMessage />
          <VideoForm.SubmitButton text="업로드하기" />
        </VideoForm.Form>
      </VideoForm>
    </main>
  );
};

export default VideoUploadPage;
