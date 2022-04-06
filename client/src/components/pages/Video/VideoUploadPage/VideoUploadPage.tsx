import React from 'react';
import VideoInput from '../../../atom/Inputs/VideoInputs/VideoInput';
import PageForm from '../../../partial/Forms/PageForm/PageForm';
import WithPrivateValidation from '../../../wrapper/WithAuthValidation/WithPrivateValidation';
import {useVideoUploadPage} from './useVideoUploadPage';
import './VideoUploadPage.scss';

const VideoUploadPage = () => {
  const {
    videoFileInputRef,
    thumbnailInputRef,
    titleInput,
    descriptionInput,
    categoryInputRef,
    alertMessage,
    onSubmit,
  } = useVideoUploadPage();
  return (
    <main className="video-upload">
      <PageForm>
        <PageForm.Title text="동영상 업로드" />
        <PageForm.Form onSubmit={onSubmit}>
          <VideoInput.VideoFileInput ref={videoFileInputRef} />
          <VideoInput.ThumbnailInput ref={thumbnailInputRef} />
          <VideoInput.TitleInput {...titleInput} />
          <VideoInput.DescriptionInput {...descriptionInput} />
          <VideoInput.CategoryInput ref={categoryInputRef} />
          <PageForm.AlertMessage text={alertMessage} />
          <PageForm.SubmitButton text="업로드하기" />
        </PageForm.Form>
      </PageForm>
    </main>
  );
};

export default WithPrivateValidation(VideoUploadPage);
