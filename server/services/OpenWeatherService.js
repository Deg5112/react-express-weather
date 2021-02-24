import axios from 'axios'

class OpenWeatherService {
  async getWeatherData(lat, lon) {
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`)
      return data;
    } catch (e) {
      console.log(e);
      return {};
    }
  }
}

export default OpenWeatherService
