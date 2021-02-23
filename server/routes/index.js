var express = require('express');
var router = express.Router();
const axios = require('axios');
import WeatherController from '../controllers/WeatherController'

router.get('/weather-data', (req, res, next) => WeatherController.getWeatherData(req, res, next));

module.exports = router;
