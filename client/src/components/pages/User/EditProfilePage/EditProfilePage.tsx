import React from 'react';
import AuthInput from '../../../atom/Inputs/AuthInputs/AuthInput';
import PageForm from '../../../partial/Forms/PageForm/PageForm';
import WithPrivateValidation from '../../../wrapper/WithAuthValidation/WithPrivateValidation';
import './EditProfilePage.scss';
import {useEditProfilePage} from './useEditProfilePage';

const EditProfilePage = () => {
  const {avatarInputRef, nameInput, statusInput, onSubmit} =
    useEditProfilePage();
  return (
    <main className="edit-profile">
      <PageForm className="edit-profile-wrapper">
        <PageForm.Title text="프로필 수정" />
        <PageForm.Form onSubmit={onSubmit}>
          <AuthInput.AvatarInput ref={avatarInputRef} />
          <AuthInput.NameInput {...nameInput} />
          <AuthInput.StatusInput {...statusInput} />
          <PageForm.SubmitButton text="적용하기" />
        </PageForm.Form>
      </PageForm>
    </main>
  );
};

export default WithPrivateValidation(EditProfilePage);
