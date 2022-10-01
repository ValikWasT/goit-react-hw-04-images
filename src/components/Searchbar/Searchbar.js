import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchbarStyled';

export const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    return onSubmit(inputValue);
  };

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          onChange={handleChange}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
