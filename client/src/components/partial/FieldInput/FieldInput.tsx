/* eslint-disable react/prop-types */
import React, {PropsWithChildren} from 'react';
import {useFileInputOnChange} from '../../../@hooks/useFileInputOnChange';
import FileInputLabel from '../../atom/FileInputLabel/FileInputLabel';
import './FieldInput.scss';

type Props = {
  fieldName: string;
  className?: string;
};

const FieldInput = ({
  fieldName,
  className = '',
  children,
}: PropsWithChildren<Props>) => (
  <div className={`field-input ${className}`}>
    <p className="field-input__field-name">{fieldName}</p>
    {children}
  </div>
);

type FieldInputFileInputProps = Required<
  Pick<React.InputHTMLAttributes<HTMLInputElement>, 'id'>
> &
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'accept' | 'required' | 'name' | 'className'
  >;

FieldInput.FileInput = React.memo(
  React.forwardRef<HTMLInputElement, FieldInputFileInputProps>(
    ({accept, required, id, name, className}, ref) => {
      const {file, onChange} = useFileInputOnChange();
      return (
        <>
          <input
            type="file"
            required={required}
            accept={accept}
            className={`field-input__file-input ${className}`}
            ref={ref}
            id={id}
            name={name}
            onChange={onChange}
          />
          <FileInputLabel htmlFor={id} file={file} />
        </>
      );
    },
  ),
);

export default FieldInput;
