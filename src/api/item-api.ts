// Interfaces
import HttpClient from '../interfaces/http-client';
import ItemApiInterface from '../interfaces/item-api';
import ItemInterface from '../interfaces/item';

// Libs
class ItemApi implements ItemApiInterface {
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
     const httpResult = await this.httpClient.get('https://frontend-tech-test-data.s3.eu-west-1.amazonaws.com/items.json');
     let result:Array<ItemInterface> = [];

     if (httpResult !== null) {
       result = httpResult.items;
     }

     if (filter.length > 0) {
       result = ItemApi.filter(result, filter);
     }

     return result;
   }

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
       if (!Number.isNaN(filterNumber)) {
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
}

export default ItemApi;
