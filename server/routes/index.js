var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/weather-data', async ({query: {lat, lon}}, res, next) => {
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`)

  res.json(data);
});

module.exports = router;
