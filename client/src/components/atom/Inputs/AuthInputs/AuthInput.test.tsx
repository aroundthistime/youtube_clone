import React from 'react';
import {render} from '@testing-library/react';
import AuthInput from './AuthInput';

describe('AuthInput', () => {
  const value = '';
  const onChange: React.ChangeEventHandler<HTMLInputElement> = () => undefined;

  it('NameInput renders OK', () => {
    render(<AuthInput.NameInput value={value} onChange={onChange} />);
  });

  it('EmailInput renders OK', () => {
    render(<AuthInput.EmailInput value={value} onChange={onChange} />);
  });

  it('StatusInput renders OK', () => {
    render(<AuthInput.StatusInput value={value} onChange={onChange} />);
  });

  it('PasswordInput renders OK', () => {
    render(<AuthInput.PasswordInput value={value} onChange={onChange} />);
  });

  it('AvatarInput renders OK', () => {
    render(<AuthInput.AvatarInput />);
  });
});
