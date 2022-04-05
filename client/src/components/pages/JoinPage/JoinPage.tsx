import React from 'react';
import routes from '../../../routes';
import PageForm from '../../partial/Forms/PageForm/PageForm';
import './JoinPage.scss';
import {useJoinPage} from './useJoinPage';
import AuthForm from '../../partial/Forms/AuthForm/AuthForm';

const JoinPage = () => {
  const {
    nameInput,
    emailInput,
    password1Input,
    password2Input,
    alertMessage,
    onSubmit,
    isLoading,
  } = useJoinPage();
  return (
    <main className="join">
      <PageForm className="join-wrapper">
        <PageForm.Title text="회원가입" />
        <AuthForm onSubmit={onSubmit}>
          <AuthForm.NameInput {...nameInput} />
          <AuthForm.EmailInput {...emailInput} />
          <AuthForm.PasswordInput {...password1Input} />
          <AuthForm.PasswordInput
            {...password2Input}
            fieldName="비밀번호 확인"
          />
          <PageForm.AlertMessage text={alertMessage} />
          <PageForm.SubmitButton text="가입하기" />
        </AuthForm>
        <AuthForm.Link path={routes.login} text="이미 계정이 있으신가요?" />
      </PageForm>
    </main>
  );
};

export default JoinPage;
