import {useLocation} from 'react-router-dom';

/* eslint-disable import/prefer-default-export */
export const useUrlQuery = () => new URLSearchParams(useLocation().search);
