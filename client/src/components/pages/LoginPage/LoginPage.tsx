import React from 'react';
import routes from '../../../routes';
import AuthFormLink from '../../partial/AuthFormLink/AuthFormLink';
import FieldInput, {
  FieldInputPropsType,
} from '../../partial/FieldInput/FieldInput';
import Loader from '../../atom/Loader/Loader';
import PageForm from '../../partial/PageForm/PageForm';
import './LoginPage.scss';
import {useLoginPage} from './useLoginPage';

const LoginPage = () => {
  const {
    emailInputProps,
    passwordInputProps,
    alertMessage,
    onSubmit,
    isLoading,
  } = useLoginPage();
  return (
    <main className="login">
      {isLoading ? (
        <Loader />
      ) : (
        <PageForm className="login-wrapper">
          <PageForm.Title text="로그인" />
          <PageForm.Form className="join-form" onSubmit={onSubmit}>
            <LoginPage.Input {...emailInputProps} />
            <LoginPage.Input {...passwordInputProps} />
            <PageForm.AlertMessage text={alertMessage} />
            <PageForm.SubmitButton text="로그인하기" />
          </PageForm.Form>
          <AuthFormLink path={routes.join} text="계정이 없으신가요?" />
        </PageForm>
      )}
    </main>
  );
};

LoginPage.Input = React.memo(
  ({
    value,
    onChange,
    fieldName,
    required = true,
    type = 'text',
    className = '',
    placeholder = '',
  }: FieldInputPropsType) => (
    <FieldInput className={`login-form__input-container ${className}`}>
      <FieldInput.FieldName fieldName={fieldName} />
      <input
        className="login-form__input"
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </FieldInput>
  ),
);

export default LoginPage;
