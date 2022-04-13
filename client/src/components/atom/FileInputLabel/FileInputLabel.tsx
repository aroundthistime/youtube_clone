import React from 'react';
import {getSizeInMB} from '../../../utils/mathHandler';
import './FileInputLabel.scss';

type Props = {
  htmlFor: string;
  file?: File;
  className?: string;
};

const FileInputLabel = ({htmlFor, file, className = ''}: Props) => (
  <label htmlFor={htmlFor} className={`file-input__label no-drag ${className}`}>
    {file ? (
      <div className="label__file-information">
        <p data-testid="file-name">파일명 : {file.name}</p>
        <p data-testid="file-size">파일용량 : {getSizeInMB(file.size)}MB</p>
      </div>
    ) : (
      <div className="label__file-upload-button">파일 선택하기</div>
    )}
  </label>
);

export default React.memo(FileInputLabel);
