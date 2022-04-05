/* eslint-disable react/prop-types */
import React, {PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';
import FieldInput from '../../FieldInput/FieldInput';
import PageForm from '../PageForm/PageForm';
import './AuthForm.scss';

interface IAuthForm
  extends React.MemoExoticComponent<
    ({children, className}: PropsWithChildren<Props>) => JSX.Element
  > {
  EmailInput: React.MemoExoticComponent<
    ({value, onChange}: AuthFormInputProps) => JSX.Element
  >;
  NameInput: React.MemoExoticComponent<
    ({value, onChange}: AuthFormInputProps) => JSX.Element
  >;
  StatusInput: React.MemoExoticComponent<
    ({value, onChange}: AuthFormInputProps) => JSX.Element
  >;
  PasswordInput: React.MemoExoticComponent<
    ({value, onChange}: PasswordInput) => JSX.Element
  >;
  AvatarInput: React.MemoExoticComponent<
    React.ForwardRefExoticComponent<React.RefAttributes<HTMLInputElement>>
  >;
  Link: ({text, path, className}: AuthFormLinkProps) => JSX.Element;
}

type Props = React.ComponentProps<typeof PageForm.Form>;

const AuthForm = React.memo(
  ({children, className, onSubmit}: PropsWithChildren<Props>) => (
    <PageForm.Form className={`auth-form ${className}`} onSubmit={onSubmit}>
      {children}
    </PageForm.Form>
  ),
) as IAuthForm;

export type AuthFormInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

AuthForm.EmailInput = React.memo(({value, onChange}: AuthFormInputProps) => (
  <FieldInput fieldName="이메일">
    <input type="email" required value={value} onChange={onChange} />
  </FieldInput>
));

AuthForm.NameInput = React.memo(({value, onChange}: AuthFormInputProps) => (
  <FieldInput fieldName="이름">
    <input required value={value} onChange={onChange} />
  </FieldInput>
));

AuthForm.StatusInput = React.memo(({value, onChange}: AuthFormInputProps) => (
  <FieldInput fieldName="상태 메세지">
    <input required value={value} onChange={onChange} />
  </FieldInput>
));

interface PasswordInput extends AuthFormInputProps {
  fieldName?: string;
}

AuthForm.PasswordInput = React.memo(
  ({value, onChange, fieldName = '비밀번호'}: PasswordInput) => (
    <FieldInput fieldName={fieldName}>
      <input type="password" required value={value} onChange={onChange} />
    </FieldInput>
  ),
);

AuthForm.AvatarInput = React.memo(
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

type AuthFormLinkProps = {
  text: string;
  path: string;
  className?: string;
};

AuthForm.Link = ({text, path, className = ''}: AuthFormLinkProps) => (
  <Link to={path} className={`auth-form__link ${className}`}>
    <p className="link__text">{text}</p>
  </Link>
);

export default AuthForm;
