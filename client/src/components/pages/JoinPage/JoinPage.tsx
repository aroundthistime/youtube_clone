import React from 'react';
import routes from '../../../routes';
import AuthFormLink from '../../partial/AuthFormLink/AuthFormLink';
import FieldInput, {
  FieldInputPropsType,
} from '../../partial/FieldInput/FieldInput';
import Loader from '../../atom/Loader/Loader';
import PageForm from '../../partial/PageForm/PageForm';
import './JoinPage.scss';
import {useJoinPage} from './useJoinPage';

const JoinPage = () => {
  const {
    nameInputProps,
    emailInputProps,
    password1InputProps,
    password2InputProps,
    alertMessage,
    onSubmit,
    isLoading,
  } = useJoinPage();
  return (
    <main className="join">
      <PageForm className="join-wrapper">
        <PageForm.Title text="회원가입" />
        <PageForm.Form className="join-form" onSubmit={onSubmit}>
          <JoinPage.Input {...nameInputProps} />
          <JoinPage.Input {...emailInputProps} />
          <JoinPage.Input {...password1InputProps} />
          <JoinPage.Input {...password2InputProps} />
          <PageForm.AlertMessage text={alertMessage} />
          <PageForm.SubmitButton text="가입하기" />
        </PageForm.Form>
        <AuthFormLink path={routes.login} text="이미 계정이 있으신가요?" />
      </PageForm>
    </main>
  );
};

JoinPage.Input = React.memo(
  ({
    value,
    onChange,
    fieldName,
    required = true,
    type = 'text',
    className = '',
    placeholder = '',
  }: FieldInputPropsType) => (
    <FieldInput className={`join-form__input-container ${className}`}>
      <FieldInput.FieldName fieldName={fieldName} />
      <input
        className="join-form__input"
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        placeholder={placeholder}
      />
    </FieldInput>
  ),
);

export default JoinPage;
