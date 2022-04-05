import React from 'react';
import routes from '../../../routes';
import AuthInput from '../../atom/Inputs/AuthInputs/AuthInput';
import Loader from '../../atom/Loader/Loader';
import PageForm from '../../partial/Forms/PageForm/PageForm';
import './LoginPage.scss';
import {useLoginPage} from './useLoginPage';

const LoginPage = () => {
  const {emailInput, passwordInput, alertMessage, onSubmit, isLoading} =
    useLoginPage();
  return (
    <main className="login">
      {isLoading ? (
        <Loader />
      ) : (
        <PageForm className="login-wrapper">
          <PageForm.Title text="로그인" />
          <PageForm.Form onSubmit={onSubmit}>
            <AuthInput.EmailInput {...emailInput} />
            <AuthInput.PasswordInput {...passwordInput} />
            <PageForm.AlertMessage text={alertMessage} />
            <PageForm.SubmitButton text="로그인하기" />
          </PageForm.Form>
          <PageForm.Link path={routes.join} text="계정이 없으신가요?" />
        </PageForm>
      )}
    </main>
  );
};

export default LoginPage;
