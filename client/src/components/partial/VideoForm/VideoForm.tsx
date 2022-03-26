import React, {PropsWithChildren} from 'react';
import {useSelector} from 'react-redux';
import PageForm from '../PageForm/PageForm';
import FieldInput from '../FieldInput/FieldInput';
import {useFileInputOnChange} from '../../../@hooks/useFileInputOnChange';
import {RootState} from '../../../@modules/root';
import FileInputLabel from '../FileInputLabel/FileInputLabel';
import './VideoForm.scss';

type Props = {
  className?: string;
};

const VideoForm = ({children, className = ''}: PropsWithChildren<Props>) => (
  <PageForm className={`video-form-wrapper ${className}`}>{children}</PageForm>
);

VideoForm.Title = PageForm.Title;

type VideoFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
};

VideoForm.Form = ({
  onSubmit,
  children,
  className = '',
}: PropsWithChildren<VideoFormProps>) => (
  <PageForm.Form className={`video-form ${className}`} onSubmit={onSubmit}>
    {children}
  </PageForm.Form>
);

VideoForm.VideoInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => {
    const {file, onChange} = useFileInputOnChange();
    return (
      <FieldInput>
        <FieldInput.FieldName fieldName="영상 파일" />
        <input
          type="file"
          required
          accept="video/*"
          className="video-form__input video-form__file-input"
          ref={ref}
          id="videoFile"
          name="videoFile"
          onChange={onChange}
        />
        <FieldInput.Label htmlFor="videoFile" file={file} />
      </FieldInput>
    );
  }),
);

VideoForm.ThumbnailInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => {
    const {file, onChange} = useFileInputOnChange();
    return (
      <FieldInput>
        <FieldInput.FieldName fieldName="썸네일 이미지" />
        <input
          type="file"
          required
          accept="image/*"
          className="video-form__input video-form__file-input"
          id="thumbnailImage"
          name="thumbnailImage"
          onChange={onChange}
          ref={ref}
        />
        <FileInputLabel htmlFor="thumbnailImage" file={file} />
      </FieldInput>
    );
  }),
);

VideoForm.TitleInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => (
    <FieldInput className="video-form__input-container">
      <FieldInput.FieldName fieldName="제목" />
      <input className="video-form__input" required ref={ref} />
    </FieldInput>
  )),
);

VideoForm.DescriptionInput = React.memo(
  React.forwardRef<HTMLTextAreaElement>((_, ref) => (
    <FieldInput>
      <FieldInput.FieldName fieldName="영상 설명" />
      <textarea rows={5} className="video-form__input" ref={ref} />
    </FieldInput>
  )),
);

VideoForm.CategoryInput = React.memo(
  React.forwardRef<HTMLSelectElement>((_, ref) => {
    const categories = useSelector((state: RootState) => state.categories);
    return (
      <FieldInput>
        <FieldInput.FieldName fieldName="카테고리 선택" />
        <select className="video-form__input" ref={ref}>
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

VideoForm.AlertMessage = () => (
  <PageForm.AlertMessage
    text="영상 및 썸네일 이미지는 16대9 비율을 권장드립니다"
    className="video-form__alert-message"
  />
);

VideoForm.SubmitButton = PageForm.SubmitButton;

export default VideoForm;
