import {Grid, withStyles} from "@material-ui/core";
import ClearSkiesDay from "@images/clear_skies.jpeg";
import ClearSkiesNight from "@images/clear-night.jpeg";
import CloudyDay from "@images/cloudy.jpeg"
import CloudyNight from "@images/cloudy-night.jpeg";
import RainyDay from "@images/rainy-day.jpeg";
import RainyNight from "@images/rainy-night.jpeg";
import StormDay from "@images/storm.jpeg";
import React, {useEffect, useState} from "react";
import ServiceProvider from '@services/ServiceProvider';
const geoService = ServiceProvider.make('geo');
const weatherService = ServiceProvider.make('weather');
const DateService = ServiceProvider.make('date');
import {whiteText} from '../../styles/shared';
import CustomConnect from '@store/connect/CustomConnect'
import {useSelector, useDispatch} from 'react-redux'
import { setWeather } from '@store/actions/weather'
import TodaysWeather from './children/TodaysWeather'
import HourlyWeather from './children/HourlyWeather'
import DailyWeather from './children/DailyWeather'

const WeatherPage = ({classes, toggleLoader}) => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const dispatch = useDispatch();
  const [latLng, setLatLng] = useState(null);
  const [cityState, setCityState] = useState('');

  const fetchWeatherData = async (latLng) => {
    toggleLoader(true);
    const {data} = await weatherService.getWeatherData(latLng.latitude, latLng.longitude);

    dispatch(setWeather(data));
    toggleLoader(false)
  };

  const getCurrentLocation = () => {
    geoService.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setLatLng({latitude, longitude});
      },
      (error) => {
        toggleLoader(false)
      }
    )
  };

  const initAutoComplete = () => {
    const autoCompleteEl = document.getElementById('autocomplete');
    geoService.initAutoComplete(autoCompleteEl, ({lat, lng}) => {
      setLatLng({latitude: lat, longitude: lng});
    })
  };

  const getBackground = () => {
    if (!weatherData) {
      return ClearSkiesDay
    }

    const { current:  { sunrise, sunset, weather} } = weatherData;
    const isDay = DateService.isDay(sunrise, sunset);

    const main = weather[0].main;
    console.log({main});

    switch (main) {
      case 'Clear':
        return isDay ? ClearSkiesDay : ClearSkiesNight;
      case 'Rain':
      case 'Drizzle':
        return isDay ? RainyDay : RainyNight;
      case 'Clouds':
        return isDay ? CloudyDay : CloudyNight;
      case 'Thunderstorm':
        return StormDay
    }
  }

  useEffect(() => {
    getCurrentLocation();
    initAutoComplete()
  }, []);

  useEffect(() => {
    if(!latLng) { return; }

    geoService.reverseGeoCode(latLng.latitude, latLng.longitude, (city, state, country) => {
      setCityState(`${city}, ${state} ${country}`)
    });

    fetchWeatherData(latLng)
  }, [latLng]);

  return (
    <Grid
      container
      className={`${classes.weatherPage} ${classes.whiteText}`}
      style={{ backgroundImage: `url(${getBackground()})`}}
    >
      <Grid
        container
        justify={"center"}
        className={classes.todayContainer}
      >
        <Grid item xs={12} sm={10} md={8}>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            justify={"space-evenly"}
            className={classes.todaysContentContainer}
          >
            <Grid
              item
              id={'auto-complete-container'}
              className={classes.autoCompleteContainer}
            >
              <input
                id={'autocomplete'}
                className={classes.autoComplete}
                value={cityState}
                onChange={e => setCityState(e.target.value)}
              />
            </Grid>
            <Grid
              item
              className={classes.todaysContainerItem}
            >
              <TodaysWeather />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.hourlyAndDailyContainer}>
        <HourlyWeather />
      </Grid>
      <Grid container className={classes.hourlyAndDailyContainer}>
        <DailyWeather />
      </Grid>
    </Grid>
  )
};


export default CustomConnect({
  component: WeatherPage,
  styles: theme => ({
    whiteText: {
      ...whiteText
    },
    weatherPage: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh'
    },
    todayContainer: {
      height: '50vh',
    },
    todaysContentContainer: {
      height: '100%'
    },
    autoCompleteContainer: {
      width: '100%',
      padding: '0px 10px'
    },
    todaysContainerItem: {
      width: '100%'
    },
    autoComplete: {
      width: '100%',
      height: 40,
      fontSize: 16,
      borderRadius: 5,
      border: 'none',
      outline: 'none',
      padding: '10px 20px',
      boxSizing: 'border-box',
      color: 'black'
    },
    hourlyAndDailyContainer: {
      // backgroundColor: '#88ADE3'
    }
  })
});
