import React from 'react';

// Constants
import { DEFAULT_PLACEHOLDER } from './searchbar.constants';

// Interfaces
import SearchBarProps from './interfaces/props';

const SearchBar = (props: SearchBarProps) => {
  const { value } = props;
  return (
    <div className="searchbar">
      <input
        type="text"
        value={value}
        placeholder={DEFAULT_PLACEHOLDER}
      />
    </div>
  );
};

const defaultProps: SearchBarProps = {
  value: '',
};

SearchBar.defaultProps = defaultProps;

export default SearchBar;
