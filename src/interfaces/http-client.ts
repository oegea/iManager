/**
 * Operations required to perform http requests
 */
 interface HttpClient{

    get:(url:string)=>Promise<any>;

}

export default HttpClient;
