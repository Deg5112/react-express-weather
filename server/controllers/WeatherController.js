import ServiceProvider from '../services/ServiceProvider'
const WeatherService = ServiceProvider.make('weather');

class WeatherController {
  weatherService;

  constructor(weatherService) {
    this.weatherService = weatherService;
  }

  async getWeatherData({query: {lat, lon}}, res, next) {
    const data = await this.weatherService.getWeatherData(lat, lon);
    return res.json(data);
  }
}

export default new WeatherController(WeatherService)
