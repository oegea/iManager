// Interfaces
import HttpClient from '../interfaces/http-client';
import DEFAULT_ITEMS_ARRAY from './default-items-array';

class FakeHttpClient implements HttpClient {
  
  /**
   * If true, an error is simulated during the http request
   */
  private simulateError:boolean = false;

  /**
   * Allows to change the class behaviour to simulate errors during the http request
   * @param value New value for simulateError
   */
  setSimulateError(value:boolean){
    this.simulateError = value;
  }

  /**
  * Performs an http get request
  * @param url Unique resource identifier
  * @returns Http request result
  */
  async get(url:string):Promise<any> {
    if (this.simulateError === true)
      return null;
    else
      return {items: DEFAULT_ITEMS_ARRAY};
  }
}

export default FakeHttpClient;
