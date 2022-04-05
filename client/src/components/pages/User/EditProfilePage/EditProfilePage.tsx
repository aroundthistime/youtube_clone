import React from 'react';
import AuthForm from '../../../partial/Forms/AuthForm/AuthForm';
import PageForm from '../../../partial/Forms/PageForm/PageForm';
import './EditProfilePage.scss';

const EditProfilePage = () => {
  return (
    <main className="edit-profile">
      <PageForm className="edit-profile-wrapper">
        <PageForm.Title text="프로필 수정" />
        <AuthForm onSubmit={e => e.preventDefault()}>{/* <AuthF */}</AuthForm>
        <PageForm.Form className="edit-profile__form" onSubmit={() => 1}>
          {/* < */}
        </PageForm.Form>
      </PageForm>
    </main>
  );
};

export default EditProfilePage;
