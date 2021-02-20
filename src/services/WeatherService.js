import axios from "axios";

class WeatherService {
  async getWeatherData() {
    return await axios.get('/api/weather-data');
  }
}

export default WeatherService
