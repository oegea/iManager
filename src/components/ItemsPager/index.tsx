// Core dependencies
import React from 'react';

// Components
import Button from '../Button';

// Constants

// Interfaces
import ItemsPagerProps from './interfaces/props';

const ItemsPager = (props: ItemsPagerProps) => {
  const {
    showButton, buttonLabel, title, onButtonClick,
  } = props;
  return (
    <div className="items-pager">
      <div className="pager-title">{title}</div>
      {showButton && <Button background="#16C0AC" color="white" onClick={onButtonClick}>{buttonLabel}</Button>}
    </div>
  );
};

const defaultProps: ItemsPagerProps = {
  title: '',
  showButton: false,
  buttonLabel: '',
};

ItemsPager.defaultProps = defaultProps;

export default ItemsPager;
