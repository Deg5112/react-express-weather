import OpenWeatherService from './OpenWeatherService';

const serviceRegistration = {
  weather: OpenWeatherService,
}

class ServiceProvider {
  constructor() {
    this.servicesInstances = {
      GeoService: null,
      WeatherService: null,
    }
  }
  make(name) {
    if(this.servicesInstances[name]) {
      return this.servicesInstances[name]
    }

    this.servicesInstances[name] = new serviceRegistration[name]();
    return this.servicesInstances[name]
  }
}

export default new ServiceProvider()
