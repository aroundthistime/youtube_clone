import React, {HTMLInputTypeAttribute} from 'react';
import FieldInput from '../../partial/FieldInput/FieldInput';
import PageForm from '../../partial/PageForm/PageForm';
import './JoinPage.scss';
import {useJoinPage} from './useJoinPage';

const JoinPage = () => {
  const {nameInput, emailInput, password1Input, password2Input} = useJoinPage();
  return (
    <main className="join">
      <PageForm className="join-wrapper">
        <PageForm.Title text="회원가입" />
        <form className="join-form">
          <JoinPage.Input {...nameInput} />
          <JoinPage.Input {...emailInput} type="email" />
          <JoinPage.Input {...password1Input} type="password" />
          <JoinPage.Input {...password2Input} type="password" />
          <PageForm.AlertMessage text="아 이렇게 하시면 안되는asdfasddf데 ;;" />
          <PageForm.SubmitButton text="가입하기" />
        </form>
      </PageForm>
    </main>
  );
};

type JoinPageInputProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  fieldName: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  className?: string;
};

JoinPage.Input = ({
  value,
  onChange,
  fieldName,
  required = true,
  type = 'text',
  className = '',
}: JoinPageInputProps) => (
  <FieldInput className={`join-form__input-container ${className}`}>
    <FieldInput.FieldName fieldName={fieldName} />
    <input
      className="join-form__input"
      value={value}
      onChange={onChange}
      type={type}
      required={required}
    />
  </FieldInput>
);

export default JoinPage;
