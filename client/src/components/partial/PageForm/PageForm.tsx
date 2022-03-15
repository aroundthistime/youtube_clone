import React, {PropsWithChildren} from 'react';
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

PageForm.AlertMessage = ({text, className = ''}: SubComponentProps) => (
  <h6 className={`form__alert-message ${className}`}>{text}</h6>
);

PageForm.SubmitButton = ({text, className = ''}: SubComponentProps) => (
  <button className={`form__submit-button no-drag ${className}`} type="submit">
    {text}
  </button>
);

export default PageForm;
