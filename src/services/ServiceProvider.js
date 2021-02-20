import GeoService from './GeoService'
import WeatherService from './WeatherService'

const serviceRegistration = {
  geo: GeoService,
  weather: WeatherService
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
