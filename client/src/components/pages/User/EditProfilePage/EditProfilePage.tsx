import React from 'react';
import PageForm from '../../../partial/Forms/PageForm/PageForm';
import './EditProfilePage.scss';

const EditProfilePage = () => {
  return (
    <main className="edit-profile">
      <PageForm className="edit-profile-wrapper">
        <PageForm.Title text="프로필 수정" />
        <PageForm.Form className="edit-profile__form" onSubmit={() => 1}>
          {/* < */}
        </PageForm.Form>
      </PageForm>
    </main>
  );
};

export default EditProfilePage;
