import Item from '../../../interfaces/item';

/**
 * Properties available for the ItemCard component
 */
 interface ItemCardProps extends Item{
    buttonLabel?: string;
    onButtonClick?: (item: Item)=>void;
}

export default ItemCardProps;
