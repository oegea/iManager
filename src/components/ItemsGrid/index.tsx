// Core dependencies
import React from 'react';

// Components
import ItemCardHandler from '../ItemCardHandler';

// Constants

// Interfaces
import ItemsGridProps from './interfaces/props';

const ItemsGrid = (props:ItemsGridProps) => {
  // Required variables
  const {
    items,
  } = props;

  // Functions

  // Render
  return (
    <div className="items-grid">
      {items.map((item) => (
        <ItemCardHandler
          key={`${item.title}-${item.email}`}
          title={item.title}
          description={item.description}
          price={item.price}
          email={item.email}
          image={item.image}
        />
      ))}
    </div>
  );
};
const defaultProps: ItemsGridProps = {
  items: [],
};

ItemsGrid.defaultProps = defaultProps;

export default ItemsGrid;
