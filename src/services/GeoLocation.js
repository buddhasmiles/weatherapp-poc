import Axios from 'axios';
import env from './ApiList.json'

class GeoLocationApiService {
    constructor() {    

        let axios = Axios.create({
            baseURL: env[0].IP_INFO_URL // env[0].IP_INFO_URL,
        });
        this.axios = axios;

    }

    getCurrentLocation() {

        return this.axios.get()        
    }
    
}
export { GeoLocationApiService }
