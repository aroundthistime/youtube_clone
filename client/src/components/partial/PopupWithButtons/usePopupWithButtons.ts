/* eslint-disable import/prefer-default-export */
import React, {useImperativeHandle, useRef} from 'react';

type ReturnType = {
  innerRef: React.RefObject<HTMLDivElement>;
};

export const usePopupWithButtons = (
  forwardRef: React.ForwardedRef<HTMLDivElement>,
) => {
  const innerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwardRef, () => innerRef.current as HTMLDivElement);

  return {
    innerRef,
  };
};
