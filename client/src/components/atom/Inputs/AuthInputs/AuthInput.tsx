import React from 'react';
import {DefaultFieldInputProps} from '../../../../@types/FieldInputProps';
import FieldInput from '../../../partial/FieldInput/FieldInput';

const NameInput = React.memo(({value, onChange}: DefaultFieldInputProps) => (
  <FieldInput fieldName="닉네임">
    <input
      value={value}
      onChange={onChange}
      required
      maxLength={20}
      placeholder="최대 20자"
    />
  </FieldInput>
));

const EmailInput = React.memo(({value, onChange}: DefaultFieldInputProps) => (
  <FieldInput fieldName="이메일">
    <input type="email" required value={value} onChange={onChange} />
  </FieldInput>
));

const StatusInput = React.memo(({value, onChange}: DefaultFieldInputProps) => (
  <FieldInput fieldName="상태 메세지">
    <input
      value={value}
      onChange={onChange}
      maxLength={20}
      placeholder="최대 20자"
    />
  </FieldInput>
));

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
  StatusInput,
  PasswordInput,
  AvatarInput,
};

export default AuthInput;
