import React from 'react';
import routes from '../../../routes';
import AuthInput from '../../atom/Inputs/AuthInputs/AuthInput';
import PageForm from '../../partial/Forms/PageForm/PageForm';
import WithPublicValidation from '../../wrapper/WithAuthValidation/WithPublicValidation';
import './JoinPage.scss';
import {useJoinPage} from './useJoinPage';

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
        <PageForm.Form onSubmit={onSubmit}>
          <AuthInput.NameInput {...nameInput} />
          <AuthInput.EmailInput {...emailInput} />
          <AuthInput.PasswordInput {...password1Input} />
          <AuthInput.PasswordInput
            fieldName="비밀번호 확인"
            {...password2Input}
          />
          <PageForm.AlertMessage text={alertMessage} />
          <PageForm.SubmitButton text="가입하기" />
        </PageForm.Form>
        <PageForm.Link path={routes.login} text="이미 계정이 있으신가요?" />
      </PageForm>
    </main>
  );
};

export default WithPublicValidation(JoinPage);
