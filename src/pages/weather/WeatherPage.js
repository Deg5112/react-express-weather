import {Grid, withStyles} from "@material-ui/core";
import ClearSkies from "@images/clear_skies.jpeg";
import React, {useEffect, useState} from "react";
import ServiceProvider from '@serviceProvider';
const geoService = ServiceProvider.make('geo');
const weatherService = ServiceProvider.make('weather');
const DateService = ServiceProvider.make('date');
import {whiteText} from '@styles';
import CustomConnect from '@store/connect/CustomConnect'

const WeatherPage = ({classes, toggleLoader}) => {
  const [weatherData, setWeatherData] = useState(null)
  const [latLng, setLatLng] = useState(null);
  const [cityState, setCityState] = useState(null);

  const fetchWeatherData = async (latLng) => {
    const {data} = await weatherService.getWeatherData(latLng.latitude, latLng.longitude);
    console.log('weather data', data)
    setWeatherData(data);
    toggleLoader(false)
  }

  const getCurrentLocation = () => {
    toggleLoader(true)
    geoService.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setLatLng({latitude, longitude});
    })
  }

  const initAutoComplete = () => {
    const autoCompleteEl = document.getElementById('autocomplete');
    geoService.initAutoComplete(autoCompleteEl, () => {

    })
  }

  const getWeatherIcon = (icon) => {
    return <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
  }

  const getTodaysWeather = () => {
    if (!weatherData) {
      return null;
    }

    const {current: {weather}} = weatherData;
    const {description, icon} = weather[0];

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify={"center"}>
            <Grid item>
              {getWeatherIcon(icon)}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <p className={classes.todaysDesciption}>{description}</p>
        </Grid>
        <Grid item xs={12}>
          <p className={classes.todaysDate}>{`${DateService.currentDay()}`}</p>
        </Grid>
      </Grid>
    )
  }

  useEffect(() => {
    getCurrentLocation()
    initAutoComplete()
  }, [])

  useEffect(() => {
    if(!latLng) { return; }

    geoService.reverseGeoCode(latLng.latitude, latLng.longitude, (city, state, country) => {
      setCityState({city, state, country})
    });

    fetchWeatherData(latLng)
  }, [latLng])
  return (
    <Grid
      container
      className={classes.todayContainer}
      style={{ backgroundImage: `url(${ClearSkies})`}}
      justify={"center"}
    >
      <Grid item xs={12} sm={10} md={8}>
        <Grid
          container
          direction={"column"}
          alignItems={"center"}
          justify={"space-evenly"}
          className={classes.todaysContentContainer}
        >
          <Grid item className={classes.autoCompleteContainer}>
            <input
              id={'autocomplete'}
              className={classes.autoComplete}
              value={`${cityState ? `${cityState.city}, ${cityState.state} ${cityState.country}` : ''}`}
              readOnly
            />
          </Grid>
          <Grid item>
            {getTodaysWeather()}
          </Grid>
        </Grid>
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
    todayContainerImage: {
      objectFit: 'cover',
      width: '100%',
    },
    todaysContentContainer: {
      height: '100%'
    },
    autoCompleteContainer: {
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
    todaysDate: {
      textAlign: 'center',
      ...whiteText
    },
    todaysDesciption: {
      textAlign: 'center',
      ...whiteText
    }
  })
});
