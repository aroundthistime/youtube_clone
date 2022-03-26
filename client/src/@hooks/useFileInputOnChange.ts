/* eslint-disable import/prefer-default-export */
import {useCallback, useState} from 'react';

type ReturnType = {
  file: File | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const useFileInputOnChange = (): ReturnType => {
  const [file, setFile] = useState<File>();
  const onChange = useCallback(event => {
    const targetElement = event.target as HTMLInputElement;
    if (targetElement.files) {
      setFile(targetElement.files[0]);
    }
  }, []);

  return {
    file,
    onChange,
  };
};
