import React from 'react';
import AuthInput from '../../../atom/Inputs/AuthInputs/AuthInput';
import PageForm from '../../../partial/Forms/PageForm/PageForm';
import WithPrivateValidation from '../../../wrapper/WithAuthValidation/WithPrivateValidation';
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
        <PageForm.Form onSubmit={onSubmit}>
          <AuthInput.PasswordInput
            fieldName="기존 비밀번호"
            {...oldPasswordInput}
          />
          <AuthInput.PasswordInput
            fieldName="새 비밀번호"
            {...newPassword1Input}
          />
          <AuthInput.PasswordInput
            fieldName="새 비밀번호 확인"
            {...newPassword2Input}
          />
          <PageForm.AlertMessage text={alertMessage} />
          <PageForm.SubmitButton text="변경하기" />
        </PageForm.Form>
      </PageForm>
    </main>
  );
};

export default WithPrivateValidation(ChangePasswordPage);
