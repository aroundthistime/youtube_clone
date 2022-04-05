import React, {PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';
import FieldInput from '../../FieldInput/FieldInput';
import './PageForm.scss';

const PageForm = ({
  children,
  className = '',
}: PropsWithChildren<{className?: string}>) => (
  <div className={`form-wrapper ${className}`}>{children}</div>
);

type SubComponentProps = {
  text: string;
  className?: string;
};

PageForm.Title = ({text, className = ''}: SubComponentProps) => (
  <h4 className={`form__title ${className}`}>{text}</h4>
);

PageForm.Form = ({
  className = '',
  onSubmit,
  children,
  id,
}: PropsWithChildren<{
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
  id?: string;
}>) => (
  <form className={className} onSubmit={onSubmit} id={id}>
    {children}
  </form>
);

PageForm.AlertMessage = ({text, className = ''}: SubComponentProps) => (
  <h6 className={`form__alert-message ${className}`}>{text}</h6>
);

PageForm.SubmitButton = ({text, className = ''}: SubComponentProps) => (
  <button className={`form__submit-button no-drag ${className}`} type="submit">
    {text}
  </button>
);

type PageFormLinkProps = {
  text: string;
  path: string;
  className?: string;
};

PageForm.Link = ({text, path, className = ''}: PageFormLinkProps) => (
  <Link to={path} className={`page-form__link ${className}`}>
    <p className="link__text">{text}</p>
  </Link>
);

export default PageForm;
