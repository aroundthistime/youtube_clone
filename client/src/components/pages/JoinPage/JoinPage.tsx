import React, {HTMLInputTypeAttribute} from 'react';
import FieldInput, {
  FieldInputPropsType,
} from '../../partial/FieldInput/FieldInput';
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
  } = useJoinPage();
  return (
    <main className="join">
      <PageForm className="join-wrapper">
        <PageForm.Title text="회원가입" />
        <form className="join-form" onSubmit={onSubmit}>
          <JoinPage.Input {...nameInputProps} />
          <JoinPage.Input {...emailInputProps} />
          <JoinPage.Input {...password1InputProps} />
          <JoinPage.Input {...password2InputProps} />
          <PageForm.AlertMessage text={alertMessage} />
          <PageForm.SubmitButton text="가입하기" />
        </form>
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
