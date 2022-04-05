import React from 'react';
import PageForm from '../../../partial/Forms/PageForm/PageForm';
import VideoForm from '../../../partial/Forms/VideoForm/VideoForm';
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
      <PageForm>
        <PageForm.Title text="동영상 업로드" />
        <VideoForm className="upload-form" onSubmit={onSubmit}>
          <VideoForm.VideoInput ref={videoFileInputRef} />
          <VideoForm.ThumbnailInput ref={thumbnailInputRef} />
          <VideoForm.TitleInput ref={titleInputRef} />
          <VideoForm.DescriptionInput ref={descriptionInputRef} />
          <VideoForm.CategoryInput ref={categoryInputRef} />
          <PageForm.AlertMessage text="영상 및 썸네일 이미지는 16대9 비율을 권장드립니다" />
          <PageForm.SubmitButton text="업로드하기" />
        </VideoForm>
      </PageForm>
    </main>
  );
};

export default VideoUploadPage;
