import Axios from 'axios';
import {API_KEY, API_BASE_URL} from  '../api/ApiConfig'

class ForecastApiService {
    constructor() {

        var baseURL = `${API_BASE_URL}/data/2.5` // 

        let axios = Axios.create({
            baseURL: baseURL,
        });
        this.axios = axios;
    }

   /**
     * Fetch weather details by city
     * @param {city} recommended City 
     */
    getForecast(city) {
        return this.axios.get(`/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=5`);
    }


    /**
     * Fetch current location weather details by city
     * @param {city} recommended City 
     */

    getCurrentLocationForecast(city){
        return this.axios.get(`weather?appid=${API_KEY}&units=imperial&q=${city}`);

    }


    
}
export { ForecastApiService }