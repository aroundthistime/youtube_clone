import React from 'react';
import ReactLoading from 'react-loading';
import './Loader.scss';

type Props = {
  className?: string;
};

const Loader = ({className = ''}: Props) => (
  <div className={`loader ${className}`}>
    <ReactLoading type="spin" width="2.5rem" height="2.5rem" color="gray" />
  </div>
);

export default Loader;
