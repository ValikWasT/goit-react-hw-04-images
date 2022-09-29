import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchbarStyled';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    return this.props.onSubmit(this.state.inputValue);
  };

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            onChange={this.handleChange}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
