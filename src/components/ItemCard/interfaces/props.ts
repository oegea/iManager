import Item from '../../../interfaces/item';

/**
 * Properties available for the ItemCard component
 */
 interface ItemCardProps extends Item{
    buttonLabel?: string;
    onButtonClick?: (title: string, email: string)=>void;
}

export default ItemCardProps;
