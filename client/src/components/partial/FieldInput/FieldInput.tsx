import React, {PropsWithChildren} from 'react';
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

export default FieldInput;
