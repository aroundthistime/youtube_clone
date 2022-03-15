/* eslint-disable import/prefer-default-export */
import {useNavigate} from 'react-router-dom';
import {useInput} from '../../../@hooks/useInput';
import routes from '../../../routes';

type ReturnType = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export const UseSearchForm = (): ReturnType => {
  const {value, onChange} = useInput('');
  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (canSubmit()) {
      navigate({
        pathname: routes.search,
        search: `?keyword=${value}`,
      });
    }
  };

  const canSubmit = (): boolean => value !== '';
  return {
    value,
    onChange,
    onSubmit,
  };
};
