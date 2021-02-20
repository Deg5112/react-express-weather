var express = require('express');
var router = express.Router();
const axios = require('axios');

const apiKey = '94649e58270b1983ed5fd1630892826f';

router.get('/weather-key', async function(req, res, next) {
  res.json({apiKey});
});

router.get('/weather-data', async function(req, res, next) {
  const data = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&appid=${apiKey}`)

  res.json('Welcome To asdf');
});

module.exports = router;
