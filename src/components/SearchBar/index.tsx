// Core dependencies
import React, { useState } from 'react';

// Constants
import { DEFAULT_PLACEHOLDER } from './search-bar.constants';
import { ENTER } from '../../constants/keys';

// Interfaces
import SearchBarProps from './interfaces/props';

const SearchBar = (props: SearchBarProps) => {
  // Required variables
  const {
    value, onSearch, sortableFields, onSortByField,
  } = props;
  const [searchText, setSearchText] = useState(value);
  const [sortBy, setSortBy] = useState('Sort by');

  // Required functions
  /**
   * Executes search callback when enter is pressed
   * @param event Event data
   */
  const onInputKeyPress = (event:{key:string}) => {
    if (event.key === ENTER && onSearch) { onSearch(searchText); }
  };

  /**
   * Changes current search text
   * @param event Event data
   */
  const onInputChange = (event:{target:{value:string}}) => {
    setSearchText(event.target.value);
  };

  /**
   * Fires an event when the order by select is changed
   * @param event Event data
   */
  const onSelectChange = (event:{target:{value:string}}) => {
    const newValue = event.target.value;
    setSortBy(newValue);
    if (onSortByField) { onSortByField(newValue); }
  };

  // Component render
  return (
    <div className="searchbar-component">
      <input
        type="text"
        value={searchText}
        placeholder={DEFAULT_PLACEHOLDER}
        onChange={onInputChange}
        onKeyPress={onInputKeyPress}
      />
      {sortableFields.length > 0 && (
      <select onChange={onSelectChange} value={sortBy}>
        <option disabled>Sort by</option>
        {sortableFields.map((field) => <option key={field}>{field}</option>)}
      </select>
      )}
    </div>
  );
};

const defaultProps: SearchBarProps = {
  value: '',
  sortableFields: [],
};

SearchBar.defaultProps = defaultProps;

export default SearchBar;
