// Core dependencies
import React from 'react';

// Components
import Button from '../Button';

// Constants

// Interfaces
import ItemCardProps from './interfaces/props';

const ItemCard = (props:ItemCardProps) => {
  // Required variables
  const {
    title, description, price, email, image, buttonLabel, onButtonClick,
  } = props;

  // Functions

  /**
   * Executed when the button is clicked
   */
  const onClick = () => {
    if (onButtonClick) { onButtonClick(title, description); }
  };

  // Render
  return (
    <div className="item">
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <div className="price">
        {price}
        {' '}
        EUR
      </div>
      <div className="title">{title}</div>

      <div className="description">{description}</div>
      <div className="email">
        De:
        {' '}
        {email}
      </div>
      <div className="buttons">
        <Button onClick={onClick}>{buttonLabel}</Button>
      </div>
    </div>
  );
};
const defaultProps: ItemCardProps = {
  title: '',
  description: '',
  price: '',
  email: '',
  image: '',
  buttonLabel: '',
};

ItemCard.defaultProps = defaultProps;

export default ItemCard;
