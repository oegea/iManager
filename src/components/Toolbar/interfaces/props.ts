/**
 * Properties available for the Toolbar component
 */
 interface ToolbarProps{
    label: string;
    onFavouritesClick?: ()=>void;
    onSearch?: (text:string)=>void;
    onSortBy?: (field:string)=>void;
}

export default ToolbarProps;
