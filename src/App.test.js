import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
// import ServiceProvider from './services/WeatherService';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

const httpMocks = require('node-mocks-http');

test('api to backend works', async () => {
  const res = await ServiceProvider.make('weather').getWeatherData(41.8781136, -87.6297982);
  console.log(res);

  // expect(data !== null).toBe(true);
  // expect(res.statusCode).toBe(200);
});
