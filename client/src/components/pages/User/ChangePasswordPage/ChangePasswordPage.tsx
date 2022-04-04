import React from 'react';
import FieldInput, {
  FieldInputPropsType,
} from '../../../partial/FieldInput/FieldInput';
import PageForm from '../../../partial/PageForm/PageForm';
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
        <PageForm.Form className="password-form" onSubmit={onSubmit}>
          <ChangePasswordPage.Input
            fieldName="기존 비밀번호"
            {...oldPasswordInput}
            type="password"
          />
          <ChangePasswordPage.Input
            fieldName="새 비밀번호"
            {...newPassword1Input}
          />
          <ChangePasswordPage.Input
            fieldName="새 비밀번호 확인"
            {...newPassword2Input}
            type="password"
          />
          <PageForm.AlertMessage text={alertMessage} />
          <PageForm.SubmitButton text="변경하기" />
        </PageForm.Form>
      </PageForm>
    </main>
  );
};

type ChangePasswordInputProps = Pick<
  FieldInputPropsType,
  'fieldName' | 'value' | 'onChange' | 'type'
>;

ChangePasswordPage.Input = React.memo(
  ({fieldName, value, onChange, type = 'text'}: ChangePasswordInputProps) => (
    <FieldInput>
      <FieldInput.FieldName fieldName={fieldName} />
      <input type={type} required value={value} onChange={onChange} />
    </FieldInput>
  ),
);

export default ChangePasswordPage;
