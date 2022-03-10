/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

import {useState} from 'react';

export const useInput = (
  initialState: string,
  validator?: (value: string) => boolean,
) => {
  const [value, setValue] = useState(initialState);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: {value: newValue},
    } = event;
    if (validator === undefined || validator(newValue)) {
      setValue(newValue);
    }
  };
  return {value, onChange};
};
