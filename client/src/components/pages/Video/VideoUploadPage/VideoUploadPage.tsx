import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../@modules/root';
import FieldInput from '../../../partial/FieldInput/FieldInput';
import FileInputLabel from '../../../partial/FileInputLabel/FileInputLabel';
import PageForm from '../../../partial/PageForm/PageForm';
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
      <PageForm className="video-upload-wrapper">
        <PageForm.Title text="동영상 업로드" />
        <PageForm.Form
          className="upload-form"
          onSubmit={onSubmit}
          id="upload-form">
          <VideoUploadPage.VideoInput ref={videoFileInputRef} />
          <VideoUploadPage.ThumbnailInput ref={thumbnailInputRef} />
          <VideoUploadPage.TitleInput ref={titleInputRef} />
          <VideoUploadPage.DescriptionInput ref={descriptionInputRef} />
          <VideoUploadPage.CategoryInput ref={categoryInputRef} />
          <PageForm.AlertMessage text="영상 및 썸네일 이미지는 16대9 비율을 권장드립니다" />
          <PageForm.SubmitButton text="업로드하기" />
        </PageForm.Form>
      </PageForm>
    </main>
  );
};

VideoUploadPage.VideoInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => {
    const [file, setFile] = useState<File>();
    const onChange = useCallback(event => {
      const targetElement = event.target as HTMLInputElement;
      if (targetElement.files) {
        setFile(targetElement.files[0]);
      }
    }, []);

    return (
      <FieldInput>
        <FieldInput.FieldName fieldName="영상 파일" />
        <input
          type="file"
          required
          accept="video/*"
          className="upload-form__input upload-form__file-input"
          ref={ref}
          id="videoFile"
          name="videoFile"
          onChange={onChange}
        />
        <FileInputLabel htmlFor="videoFile" file={file} />
      </FieldInput>
    );
  }),
);

VideoUploadPage.ThumbnailInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => (
    <FieldInput>
      <FieldInput.FieldName fieldName="썸네일 이미지" />
      <input
        type="file"
        required
        accept="image/*"
        className="upload-form__input upload-form__file-input"
        name="thumbnailImage"
        ref={ref}
      />
    </FieldInput>
  )),
);

VideoUploadPage.TitleInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => (
    <FieldInput className="upload-form__input-container">
      <FieldInput.FieldName fieldName="제목" />
      <input className="upload-form__input" required ref={ref} />
    </FieldInput>
  )),
);

VideoUploadPage.DescriptionInput = React.memo(
  React.forwardRef<HTMLTextAreaElement>((_, ref) => (
    <FieldInput>
      <FieldInput.FieldName fieldName="영상 설명" />
      <textarea rows={5} className="upload-form__input" ref={ref} />
    </FieldInput>
  )),
);

VideoUploadPage.CategoryInput = React.memo(
  React.forwardRef<HTMLSelectElement>((_, ref) => {
    const categories = useSelector((state: RootState) => state.categories);
    return (
      <FieldInput>
        <FieldInput.FieldName fieldName="카테고리 선택" />
        <select className="upload-form__input" ref={ref}>
          {categories.map(category => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
          <option>기타</option>
        </select>
      </FieldInput>
    );
  }),
);

export default VideoUploadPage;
