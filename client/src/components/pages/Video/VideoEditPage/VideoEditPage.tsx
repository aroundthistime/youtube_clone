import React from 'react';
import VideoInput from '../../../atom/Inputs/VideoInputs/VideoInput';
import PageForm from '../../../partial/Forms/PageForm/PageForm';
import {useVideoEditPage} from './useVideoEditPage';
import './VideoEditPage.scss';

const VideoEditPage = () => {
  const {onSubmit, titleInput, descriptionInput, categoryInputRef} =
    useVideoEditPage();
  return (
    <main className="video-edit">
      <PageForm>
        <PageForm.Title text="동영상 수정" />
        <PageForm.Form onSubmit={onSubmit}>
          <VideoInput.TitleInput {...titleInput} />
          <VideoInput.DescriptionInput {...descriptionInput} />
          <VideoInput.CategoryInput ref={categoryInputRef} />
          <PageForm.SubmitButton text="업로드하기" />
        </PageForm.Form>
      </PageForm>
    </main>
  );
};

export default VideoEditPage;
