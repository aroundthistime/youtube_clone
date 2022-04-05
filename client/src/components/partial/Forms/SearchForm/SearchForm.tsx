import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import './SearchForm.scss';
import {UseSearchForm} from './useSearchForm';

const SearchForm = () => {
  const {value, onChange, onSubmit} = UseSearchForm();
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        className="search-form__input"
        value={value}
        onChange={onChange}
        placeholder="검색할 내용을 입력하세요"
      />
      <SearchForm.Button />
    </form>
  );
};

SearchForm.Button = () => (
  <button type="submit" className="search-form__submit-btn">
    <FontAwesomeIcon icon={faSearch} />
  </button>
);

export default React.memo(SearchForm);
