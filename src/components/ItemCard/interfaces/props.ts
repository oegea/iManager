/**
 * Properties available for the ItemCard component
 */
 interface ButtonProps{
    title: string;
    description: string;
    price: string;
    email: string;
    image: string;
    buttonLabel?: string;
    onButtonClick?: (title: string, email: string)=>void;
}

export default ButtonProps;
