import {Grid, withStyles} from "@material-ui/core";
import ClearSkies from "@images/clear_skies.jpeg";
import React, {useEffect, useState} from "react";
import ServiceProvider from '@serviceProvider';
const geoService = ServiceProvider.make('geo');
const weatherService = ServiceProvider.make('weather');
const DateService = ServiceProvider.make('date');
import {whiteText} from '@styles';
import CustomConnect from '@store/connect/CustomConnect'
import {useSelector, useDispatch} from 'react-redux'
import { setWeather } from '@store/actions/weather'
import TodaysWeather from './children/TodaysWeather'
import HourlyWeather from './children/HourlyWeather'

const WeatherPage = ({classes, toggleLoader}) => {
  const weatherData = useSelector(state => state.weather.weatherData);
  const dispatch = useDispatch();
  const [latLng, setLatLng] = useState(null);
  const [cityState, setCityState] = useState(null);

  const fetchWeatherData = async (latLng) => {
    const {data} = await weatherService.getWeatherData(latLng.latitude, latLng.longitude);
    console.log('weather data', data)

    dispatch(setWeather(data))
    toggleLoader(false)
  };

  const getCurrentLocation = () => {
    toggleLoader(true)
    geoService.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setLatLng({latitude, longitude});
    })
  };

  const initAutoComplete = () => {
    const autoCompleteEl = document.getElementById('autocomplete');
    geoService.initAutoComplete(autoCompleteEl, () => {

    })
  };

  useEffect(() => {
    getCurrentLocation();
    initAutoComplete()
  }, []);

  useEffect(() => {
    if(!latLng) { return; }

    geoService.reverseGeoCode(latLng.latitude, latLng.longitude, (city, state, country) => {
      setCityState({city, state, country})
    });

    fetchWeatherData(latLng)
  }, [latLng]);

  return (
    <Grid
      container
    >
      <Grid
        container
        justify={"center"}
        style={{ backgroundImage: `url(${ClearSkies})`}}
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
              className={classes.autoCompleteContainer}
            >
              <input
                id={'autocomplete'}
                className={classes.autoComplete}
                value={`${cityState ? `${cityState.city}, ${cityState.state} ${cityState.country}` : ''}`}
                readOnly
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
    </Grid>
  )
}


export default CustomConnect({
  component: WeatherPage,
  styles: theme => ({
    todayContainer: {
      height: '50vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    },
    todaysContentContainer: {
      height: '100%'
    },
    autoCompleteContainer: {
      width: '100%'
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
      backgroundColor: '#88ADE3'
    }
  })
});
