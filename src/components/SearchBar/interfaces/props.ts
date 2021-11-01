/**
 * Properties available for the SearchBar component
 */
interface SearchBarProps{
    value?: string;
    onSearch?: (text?: string) => void;
    sortableFields: string[];
    onSortByField?: (field: string) => void;
}

export default SearchBarProps;
