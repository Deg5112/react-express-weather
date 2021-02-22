var express = require('express');
var router = express.Router();
const axios = require('axios');

const apiKey = '94649e58270b1983ed5fd1630892826f';

router.get('/weather-key', async (req, res, next) => {
  res.json({apiKey}) //
});

router.get('/weather-data', async ({query: {lat, lon}}, res, next) => {
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)

  res.json(data);
});

module.exports = router;
