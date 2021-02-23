const axios = require("axios");

class WeatherService {
  async getWeatherData(lat, lon) {
    return await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`)
  }
}

module.exports = WeatherService
