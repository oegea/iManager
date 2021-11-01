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
     let result = [];

     if (httpResult !== null) {
       result = httpResult.items;
     }

     return result;
   }
}

export default ItemApi;
