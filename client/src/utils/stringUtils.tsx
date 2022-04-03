/* eslint-disable import/prefer-default-export */
import React from 'react';

export const getTextWithLinebreaks = (text: string) => {
  return (
    <>
      {text.split('\n').map(textToken => {
        if (textToken === '') {
          return <br />;
        }
        // eslint-disable-next-line react/no-array-index-key
        return <p key={textToken}>{textToken}</p>;
      })}
    </>
  );
};
