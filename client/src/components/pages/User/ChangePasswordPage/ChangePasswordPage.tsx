import React from 'react';
import AuthForm from '../../../partial/Forms/AuthForm/AuthForm';
import PageForm from '../../../partial/Forms/PageForm/PageForm';
import './ChangePasswordPage.scss';
import {useChangePasswordPage} from './useChangePasswordPage';

const ChangePasswordPage = () => {
  const {
    oldPasswordInput,
    newPassword1Input,
    newPassword2Input,
    onSubmit,
    alertMessage,
  } = useChangePasswordPage();
  return (
    <main className="change-password">
      <PageForm className="change-password-wrapper">
        <PageForm.Title text="비밀번호 변경" />
        <AuthForm className="password-form" onSubmit={onSubmit}>
          <AuthForm.PasswordInput
            {...oldPasswordInput}
            fieldName="기존 비밀번호"
          />
          <AuthForm.PasswordInput
            {...newPassword1Input}
            fieldName="새 비밀번호"
          />
          <AuthForm.PasswordInput
            {...newPassword2Input}
            fieldName="새 비밀번호 확인"
          />
          <PageForm.AlertMessage text={alertMessage} />
          <PageForm.SubmitButton text="변경하기" />
        </AuthForm>
      </PageForm>
    </main>
  );
};

export default ChangePasswordPage;
