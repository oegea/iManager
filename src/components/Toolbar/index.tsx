// Core dependencies
import React from 'react';

// Components
import SearchBar from '../SearchBar';
import Button from '../Button';

// Constants
import { SECONDARY_BUTTON_COLOR, SECONDARY_BUTTON_BACKGROUND } from '../Button/button.constants';
import { SORTABLE_FIELDS } from './toolbar.constants';

// Interfaces
import ToolbarProps from './interfaces/props';

const Toolbar = (props: ToolbarProps) => {
  // Required variables
  const {
    label, onFavouritesClick, onSearch, onSortBy,
  } = props;

  return (
    <div className="toolbar">
      <div className="label">{label}</div>
      <div className="searchbar">
        <SearchBar onSearch={onSearch} sortableFields={SORTABLE_FIELDS} onSortByField={onSortBy} />
      </div>
      <div className="favouritesButton">
        <Button
          color={SECONDARY_BUTTON_COLOR}
          background={SECONDARY_BUTTON_BACKGROUND}
          onClick={onFavouritesClick}
        >
          Favourites
        </Button>
      </div>
    </div>
  );
};

const defaultProps: ToolbarProps = {
  label: '',
};

Toolbar.defaultProps = defaultProps;

export default Toolbar;
