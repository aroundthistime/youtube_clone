/* eslint-disable react/prop-types */
import React, {PropsWithChildren} from 'react';
import {useSelector} from 'react-redux';
import PageForm from '../PageForm/PageForm';
import FieldInput from '../../FieldInput/FieldInput';
import {RootState} from '../../../../@modules/root';
import './VideoForm.scss';

type Props = React.ComponentProps<typeof PageForm.Form>;

const VideoForm = ({onSubmit, children, className = ''}: Props) => (
  <PageForm.Form className={`video-form ${className}`} onSubmit={onSubmit}>
    {children}
  </PageForm.Form>
);

VideoForm.VideoInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => (
    <FieldInput fieldName="영상 파일">
      <FieldInput.FileInput
        required
        accept="video/*"
        className="video-form__input video-form__file-input"
        ref={ref}
        id="videoFile"
        name="videoFile"
      />
    </FieldInput>
  )),
);

VideoForm.ThumbnailInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => (
    <FieldInput fieldName="썸네일 이미지">
      <FieldInput.FileInput
        required
        accept="image/*"
        className="video-form__input video-form__file-input"
        ref={ref}
        id="thumbnailImage"
        name="thumbnailImage"
      />
    </FieldInput>
  )),
);

VideoForm.TitleInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => (
    <FieldInput fieldName="제목">
      <input className="video-form__input" required ref={ref} />
    </FieldInput>
  )),
);

VideoForm.DescriptionInput = React.memo(
  React.forwardRef<HTMLTextAreaElement>((_, ref) => (
    <FieldInput fieldName="영상 설명">
      <textarea rows={5} className="video-form__input" ref={ref} />
    </FieldInput>
  )),
);

VideoForm.CategoryInput = React.memo(
  React.forwardRef<HTMLSelectElement>((_, ref) => {
    const categories = useSelector((state: RootState) => state.categories);
    return (
      <FieldInput fieldName="카테고리 선택">
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

export default VideoForm;
