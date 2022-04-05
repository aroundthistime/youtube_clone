/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import {useState} from 'react';

type UserInputElementType =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export const useInput = <T extends UserInputElementType = HTMLInputElement>(
  initialState: string,
  validator?: (value: string) => boolean,
) => {
  const [value, setValue] = useState(initialState);
  const onChange = (event: React.ChangeEvent<T>) => {
    const {
      target: {value: newValue},
    } = event;
    if (validator === undefined || validator(newValue)) {
      setValue(newValue);
    }
  };
  return {value, onChange, setValue};
};
