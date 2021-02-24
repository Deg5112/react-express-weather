import axios from "axios";

class WeatherService {
  async getWeatherData(lat, lon) {
    try {
      return await axios.get(`/api/weather-data?lat=${lat}&lon=${lon}`);
    } catch (e) {
      console.log('E', e)
    }
  }
}

export default WeatherService
