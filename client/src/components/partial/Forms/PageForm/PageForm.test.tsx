import React from 'react';
import {render} from '../../../../utils/testUtils';
import PageForm from './PageForm';

describe('PageForm', () => {
  const onSubmit = jest
    .fn()
    .mockImplementation(event => event.preventDefault());
  window.HTMLFormElement.prototype.submit = () => {};
  it('renders OK', () => {
    render(
      <PageForm>
        <div />
      </PageForm>,
    );
  });

  it('PageFormTitle renders OK', () => {
    render(<PageForm.Title text="제목" />);
  });

  it('Form of PageForm renders OK', () => {
    render(<PageForm.Form onSubmit={onSubmit} />);
  });

  it('PageForm AlertMessage renders OK', () => {
    render(<PageForm.AlertMessage text="주의" />);
  });

  it('PageForm SubmitButton renders OK', () => {
    const submitButtonText = '제출';
    render(
      <PageForm.Form onSubmit={onSubmit}>
        <PageForm.SubmitButton text={submitButtonText} />
      </PageForm.Form>,
    );
  });

  it('Link inside PageForm renders OK', () => {
    const path = '/random/path';
    const text = 'this is link to random path';
    const {getByText, container} = render(
      <PageForm.Link text={text} path={path} />,
    );

    expect(
      container.querySelector('.page-form__link')?.getAttribute('href'),
    ).toEqual(path);

    getByText(text);
  });
});
