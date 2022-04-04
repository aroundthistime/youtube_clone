import React from 'react';
import {toast} from 'react-toastify';
import constants from '../constants';

export const showLoadingToast = () => {
  return toast.loading(constants.messages.loading);
};

export const showSuccessToastAfterLoading = (
  toastId: React.ReactText,
  message: string,
) => updateToast(toastId, message, 'success');

export const showErrorToastAfterLoading = (
  toastId: React.ReactText,
  message: string = constants.messages.taskFailed,
) => updateToast(toastId, message, 'error');

const updateToast = (
  toastId: React.ReactText,
  message: string,
  type: 'success' | 'error',
) => {
  toast.update(toastId, {
    render: message,
    type,
    isLoading: false,
    autoClose: 3000,
    closeOnClick: true,
  });
};
