// Core dependencies
import axios from 'axios';

// Interfaces
import HttpClient from '../interfaces/http-client';

class AxiosClient implements HttpClient {
   private axios;

   constructor() {
     this.axios = axios;
   }

   /**
    * Performs an http get request
    * @param url Unique resource identifier
    * @returns Http request result
    */
   async get(url:string):Promise<any> {
     try {
       const httpResult = await this.axios.get(url);

       return httpResult.data;
     } catch (exception) {
       return null;
     }
   }
}

export default AxiosClient;
