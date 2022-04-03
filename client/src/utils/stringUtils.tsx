/* eslint-disable import/prefer-default-export */
import React from 'react';

export const getTextWithLinebreaks = (text: string) => {
  return (
    <>
      {text.split('\n').map((textToken, index) => {
        if (textToken === '') {
          // eslint-disable-next-line react/no-array-index-key
          return <br key={index} />;
        }
        return <p key={textToken}>{textToken}</p>;
      })}
    </>
  );
};
