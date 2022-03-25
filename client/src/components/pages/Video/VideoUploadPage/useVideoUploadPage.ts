import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

/* eslint-disable import/prefer-default-export */
export const useVideoUploadPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    console.log(videoFileInputRef.current?.files);
  };
  return {
    videoFileInputRef,
    thumbnailInputRef,
    titleInputRef,
    descriptionInputRef,
    categoryInputRef,
    onSubmit,
  };
};
