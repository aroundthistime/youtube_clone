import React from 'react';
import {DefaultFieldInputProps} from '../../../../@types/FieldInputProps';
import FieldInput from '../../../partial/FieldInput/FieldInput';

const NameInput = React.memo(({value, onChange}: DefaultFieldInputProps) => (
  <FieldInput fieldName="닉네임">
    <input value={value} onChange={onChange} required />
  </FieldInput>
));

const EmailInput = React.memo(({value, onChange}: DefaultFieldInputProps) => (
  <FieldInput fieldName="이메일">
    <input type="email" required value={value} onChange={onChange} />
  </FieldInput>
));

const StatueMessageInput = React.memo(
  ({value, onChange}: DefaultFieldInputProps) => (
    <FieldInput fieldName="상대 메세지">
      <input value={value} onChange={onChange} />
    </FieldInput>
  ),
);

interface PasswordInputProps extends DefaultFieldInputProps {
  fieldName?: string;
}

const PasswordInput = React.memo(
  ({value, onChange, fieldName = '비밀번호'}: PasswordInputProps) => (
    <FieldInput fieldName={fieldName}>
      <input type="password" required value={value} onChange={onChange} />
    </FieldInput>
  ),
);

const AvatarInput = React.memo(
  React.forwardRef<HTMLInputElement>((_, ref) => (
    <FieldInput fieldName="프로필 이미지">
      <FieldInput.FileInput
        required
        accept="image/*"
        ref={ref}
        id="avatarImage"
        name="avatarImage"
      />
    </FieldInput>
  )),
);

const AuthInput = {
  NameInput,
  EmailInput,
  StatueMessageInput,
  PasswordInput,
  AvatarInput,
};

export default AuthInput;
