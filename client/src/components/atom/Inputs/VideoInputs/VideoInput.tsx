import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../@modules/root';
import FieldInput from '../../../partial/FieldInput/FieldInput';
import {
  DefaultFieldInputProps,
  DefaultFieldSelectProps,
  DefaultFieldTextareaProps,
} from '../../../../@types/FieldInputProps';

const VideoFileInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => (
    <FieldInput fieldName="영상 파일">
      <FieldInput.FileInput
        // required
        accept="video/*"
        ref={ref}
        id="videoFile"
        name="videoFile"
      />
    </FieldInput>
  )),
);

const ThumbnailInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => (
    <FieldInput fieldName="썸네일 이미지">
      <FieldInput.FileInput
        // required
        accept="image/*"
        ref={ref}
        id="thumbnailImage"
        name="thumbnailImage"
      />
    </FieldInput>
  )),
);

const TitleInput = React.memo(({value, onChange}: DefaultFieldInputProps) => (
  <FieldInput fieldName="제목">
    <input required value={value} onChange={onChange} />
  </FieldInput>
));

const DescriptionInput = React.memo(
  ({value, onChange}: DefaultFieldTextareaProps) => (
    <FieldInput fieldName="영상 설명">
      <textarea value={value} onChange={onChange} rows={5} />
    </FieldInput>
  ),
);

const CategoryInput = React.memo(
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

export const getCategoryFromCategoryInputValue = (
  value: string | undefined,
): string | undefined => {
  if (value === undefined || value === '기타') {
    return undefined;
  }
  return value;
};

const VideoInput = {
  VideoFileInput,
  ThumbnailInput,
  TitleInput,
  DescriptionInput,
  CategoryInput,
};

export default VideoInput;
