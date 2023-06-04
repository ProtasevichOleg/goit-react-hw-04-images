// Searchbar.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import showMessage from 'utils/swalConfig';
import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchInput,
  StyledIcon,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit, isSubmitting }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return showMessage(
        'Search query cannot be empty. Please enter a valid search query.'
      );
    }
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton disabled={isSubmitting} type="submit">
          <StyledIcon icon={faSearch} />
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>

        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default Searchbar;
