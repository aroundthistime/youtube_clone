import React from 'react';
import FieldInput from '../../../partial/FieldInput/FieldInput';

type DefaultProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

const NameInput = ({value, onChange}: DefaultProps) => (
  <FieldInput fieldName="닉네임">
    <input value={value} onChange={onChange} required />
  </FieldInput>
);

const EmailInput = ({value, onChange}: DefaultProps) => (
  <FieldInput fieldName="이메일">
    <input type="email" required value={value} onChange={onChange} />
  </FieldInput>
);

const StatueMessageInput = ({value, onChange}: DefaultProps) => (
  <FieldInput fieldName="상대 메세지">
    <input value={value} onChange={onChange} />
  </FieldInput>
);

interface PasswordInputProps extends DefaultProps {
  fieldName?: string;
}

const PasswordInput = ({
  value,
  onChange,
  fieldName = '비밀번호',
}: PasswordInputProps) => (
  <FieldInput fieldName={fieldName}>
    <input type="password" required value={value} onChange={onChange} />
  </FieldInput>
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
