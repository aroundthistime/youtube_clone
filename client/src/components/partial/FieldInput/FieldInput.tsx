import React, {PropsWithChildren} from 'react';
import {getSizeInMB} from '../../../utils/mathHandler';
import './FieldInput.scss';

export interface FieldInputPropsType
  extends Pick<
    React.HTMLProps<HTMLInputElement>,
    'value' | 'onChange' | 'required' | 'type' | 'placeholder'
  > {
  fieldName: string;
  className?: string;
}

type DefaultProps = {
  className?: string;
};

interface Props extends DefaultProps {}

const FieldInput = ({className = '', children}: PropsWithChildren<Props>) => (
  <div className={`field-input ${className}`}>{children}</div>
);

interface FieldNameProps extends DefaultProps {
  fieldName: string;
}

FieldInput.FieldName = ({fieldName, className = ''}: FieldNameProps) => (
  <p className={`field-input__field-name ${className}`}>{fieldName}</p>
);
interface FieldInputLabelProps {
  htmlFor: string;
  file?: File;
  className?: string;
}

FieldInput.Label = React.memo(
  ({htmlFor, file, className = ''}: FieldInputLabelProps) => (
    <label
      htmlFor={htmlFor}
      className={`file-input__label no-drag ${className}`}>
      {file ? (
        <div className="file-information">
          <p>파일명 : {file.name}</p>
          <p>파일용량 : {getSizeInMB(file.size)}MB</p>
        </div>
      ) : (
        <div className="file-upload-button">파일 선택하기</div>
      )}
    </label>
  ),
);

export default FieldInput;
