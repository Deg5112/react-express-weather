const WeatherService = require('./WeatherService')

const serviceRegistration = {
  weather: WeatherService,
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

module.exports = new ServiceProvider()
