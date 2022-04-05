import React from 'react';
import PageForm from '../../../partial/Forms/PageForm/PageForm';
import VideoForm from '../../../partial/Forms/VideoForm/VideoForm';
import {useVideoEditPage} from './useVideoEditPage';
import './VideoEditPage.scss';

const VideoEditPage = () => {
  const {onSubmit, titleInputRef, descriptionInputRef, categoryInputRef} =
    useVideoEditPage();
  return (
    <main className="video-edit">
      <PageForm>
        <PageForm.Title text="동영상 수정" />
        <VideoForm className="edit-form" onSubmit={onSubmit}>
          <VideoForm.TitleInput ref={titleInputRef} />
          <VideoForm.DescriptionInput ref={descriptionInputRef} />
          <VideoForm.CategoryInput ref={categoryInputRef} />
          <PageForm.SubmitButton text="업로드하기" />
        </VideoForm>
      </PageForm>
    </main>
  );
};

export default VideoEditPage;
