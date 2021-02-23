import WeatherController from '../server/controllers/WeatherController'
const httpMocks = require('node-mocks-http');

test('weather data endpoint works', async () => {
  const response = httpMocks.createResponse();
  const res = await WeatherController.getWeatherData({query: {lat: 41.8781136, lon: -87.6297982}}, response);
  const data = res._getJSONData();

  expect(data !== null).toBe(true);
  expect(res.statusCode).toBe(200);
});
