/**
 * Properties available for the SearchBar component
 */
 interface SearchBarProps{
    value?: string;
    onSearch?: (text?: string) => void;
}

export default SearchBarProps;
