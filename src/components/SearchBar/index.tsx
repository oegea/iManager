// Core dependencies
import React, { useState } from 'react';

// Constants
import { DEFAULT_PLACEHOLDER, ENTER_KEY } from './search-bar.constants';

// Interfaces
import SearchBarProps from './interfaces/props';

const SearchBar = (props: SearchBarProps) => {
  // Required variables
  const { value, onSearch } = props;
  const [searchText, setSearchText] = useState(value);

  // Required functions
  /**
   * Executes search callback when enter is pressed
   * @param event Event data
   */
  const onKeyPress = (event:{key:string}) => {
    if (event.key === ENTER_KEY && onSearch) { onSearch(searchText); }
  };

  /**
   * Changes current search text
   * @param event Event data
   */
  const onChange = (event:{target:{value:string}}) => {
    setSearchText(event.target.value);
  };

  // Component render
  return (
    <div className="searchbar">
      <input
        type="text"
        value={searchText}
        placeholder={DEFAULT_PLACEHOLDER}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

const defaultProps: SearchBarProps = {
  value: '',
  onSearch: undefined,
};

SearchBar.defaultProps = defaultProps;

export default SearchBar;
