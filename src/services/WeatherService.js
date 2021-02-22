import axios from "axios";
//
class WeatherService {
  async getWeatherData(lat, lon) {
    return await axios.get(`/api/weather-data?lat=${lat}&lon=${lon}`);
  }
}

export default WeatherService
