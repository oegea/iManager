// Interfaces
import HttpClient from '../interfaces/http-client';
import ItemApiInterface from '../interfaces/item-api';
import ItemInterface from '../interfaces/item';

// Libs
class ItemApi implements ItemApiInterface {
  // Constants
  private ITEMS_URL = 'https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json';

  /**
   * Instance of the used http client
   */
   private httpClient:HttpClient;

   /**
    * CTOR
    * @param apiClient Instance of the http client used to perform requests
    */
   constructor(apiClient:HttpClient) {
     this.httpClient = apiClient;
   }

   /**
   * Retrieves an items list that follow the required criteria
   * @param filter Text to filter items
   * @param sortBy Field from which items will be sorted
   * @param itemsPerPage Number of items included on each page
   * @param page Page number
   * @returns List of items that match the specified criteria
   */
   async search(
     filter: string, sortBy: string, itemsPerPage: number, page: number,
   ):Promise<Array<ItemInterface>> {
     const httpResult = await this.httpClient.get(this.ITEMS_URL);
     let result:Array<ItemInterface> = [];

     if (httpResult !== null) {
       result = httpResult.items;
     }

     if (sortBy.length > 0) {
       result = ItemApi.sort(result, sortBy);
     }

     if (filter.length > 0) {
       result = ItemApi.filter(result, filter);
     }

     // Paging
     result = ItemApi.pageItems(result, page, itemsPerPage);

     return result;
   }

   // #region Filter
   /**
    * Filters the result by the specified search
    * @param result Array of retrieved result
    * @param filter String with the received filter
    * @returns Array of filtered items
    */
   static filter(result:Array<ItemInterface>, filter: string):Array<ItemInterface> {
     const filteredResult = result.filter((item) => {
       // Transform the filter to int to check if it's a number
       const filterNumber = parseInt(filter, 10);

       // If filter is a number, we'll just filter by price
       if (!Number.isNaN(filterNumber) && !/[a-zA-Z]/g.test(filter)) {
         return ItemApi.filterByNumber(item.price, filterNumber);
       }

       // Filter is not a number, so we'll filter by title, description and e-mail
       return ItemApi.filterByText(filter, item.title, item.description, item.email);
     });
     return filteredResult;
   }

   /**
    * Returns true if an item's price is lower or equal to the price specified in the filter
    * @param price Price expressed as string
    * @param filterNumber Filter converted to integer
    * @returns True if itemPrice's is lower or equal to the price specified as filter
    */
   static filterByNumber(price: string, filterNumber: number) {
     const itemPrice:number = parseInt(price, 10);
     return (
       filterNumber >= itemPrice
     );
   }

   /**
    * Returns true if the item's title, description or e-mail contain the filter
    * @param filter Specified filter
    * @param title Item's title
    * @param description Item's description
    * @param email Item's e-mail
    * @returns True if the item matches with the filter
    */
   static filterByText(filter: string, title: string, description: string, email: string) {
     const lowerFilter = filter.toLowerCase();
     const lowerItemTitle = title.toLowerCase();
     const lowerItemDescription = description.toLowerCase();
     const lowerItemEmail = email.toLowerCase();

     return (
       lowerItemTitle.indexOf(lowerFilter) !== -1
          || lowerItemDescription.indexOf(lowerFilter) !== -1
          || lowerItemEmail.indexOf(lowerFilter) !== -1
     );
   }

   // #endregion

   // #region Sort

   /**
    * Sorts an item list
    * @param result List to sort
    * @param sortBy Field to sort by
    * @returns Sorted list
    */
   static sort(result:Array<ItemInterface>, sortBy: string):Array<ItemInterface> {
     return result.sort(ItemApi.evaluateOrder.bind(this, sortBy));
   }

   /**
    * Given a sort criteria and two items, evaluates which of them should be the first
    * @param sortBy Field to sort by
    * @param firstItem First item
    * @param secondItem Second item
    * @returns -1 in case first item goes first, 1 in case second item goes first, 0 if equal
    */
   static evaluateOrder(sortBy: string, firstItem:ItemInterface, secondItem:ItemInterface):number {
     const [firstItemValue, secondItemValue] = ItemApi.getFieldsForSort(
       firstItem, secondItem, sortBy,
     );

     if (firstItemValue < secondItemValue) { return -1; }
     if (firstItemValue > secondItemValue) { return 1; }
     return 0;
   }

   /**
    * Retrieves one specific field value from two different items
    * @param firstItem First item from which select the required field
    * @param secondItem Second item from which select the required field
    * @param sortBy Field to retrieve
    * @returns An array with the field values
    */
   static getFieldsForSort(firstItem: ItemInterface, secondItem: ItemInterface, sortBy: string) {
     switch (sortBy) {
       default:
       case 'Title':
         return [firstItem.title, secondItem.title];

       case 'Email':
         return [firstItem.email, secondItem.email];

       case 'Description':
         return [firstItem.description, secondItem.description];

       case 'Price':
         return [parseInt(firstItem.price, 10), parseInt(secondItem.price, 10)];
     }
   }

   // #endregion

   // #region Paging
   /**
    * Pages a full array to display just a portion that corresponds to a specific page
    * @param result Full array of results
    * @param page Current page (starts at 0)
    * @param itemsPerPage Items displayed per page
    * @returns Portion of the array to include in the current page
    */
   static pageItems(result:Array<ItemInterface>, page:number, itemsPerPage:number) {
     const start = (page * itemsPerPage);
     const end = start + itemsPerPage;
     return result.slice(start, end);
   }
   // #endregion
}

export default ItemApi;
