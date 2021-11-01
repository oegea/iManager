import Item from './item';

/**
 * Operations required to access the items database
 */
 interface ItemApi{
    /**
     * Search items on the database
     */
    search: (
        filter: string, sortBy: string, itemsPerPage: number, page: number
    )=>Promise<Array<Item>>;
}

export default ItemApi;
