import React from 'react';
import VideoForm from '../../../partial/VideoForm/VideoForm';
import {useVideoEditPage} from './useVideoEditPage';
import './VideoEditPage.scss';

const VideoEditPage = () => {
  const {onSubmit, titleInputRef, descriptionInputRef, categoryInputRef} =
    useVideoEditPage();
  return (
    <main className="video-edit">
      <VideoForm>
        <VideoForm.Title text="동영상 수정" />
        <VideoForm.Form className="edit-form" onSubmit={onSubmit}>
          <VideoForm.TitleInput ref={titleInputRef} />
          <VideoForm.DescriptionInput ref={descriptionInputRef} />
          <VideoForm.CategoryInput ref={categoryInputRef} />
          <VideoForm.SubmitButton text="업로드하기" />
        </VideoForm.Form>
      </VideoForm>
    </main>
  );
};

export default VideoEditPage;
