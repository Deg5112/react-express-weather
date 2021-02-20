import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {Grid, withStyles} from '@material-ui/core'
import ClearSkies from '@images/clear_skies.jpeg';
import ServiceProvider from '@serviceProvider';

const App = ({classes}) => {
  const [weatherData, setWeatherData] = useState(null)

  const getData = async () => {
    const data = await ServiceProvider.make('weather').getWeatherData();
    setWeatherData(data);
  }

  const promptForLocation = () => {
    console.log('prompt!')
    const geolocateSuccess = pos => console.log({pos})
    const geolocateError = error => {
      let geolocateCodeError = '';

      switch (error.code) {
        case error.PERMISSION_DENIED:    geolocateCodeError = "user denied the request for geolocatelocation."; break;
        case error.POSITION_UNAVAILABLE: geolocateCodeError = "Location information is unavailable.";           break;
        case error.TIMEOUT:              geolocateCodeError = "The request to get user location timed out.";    break;
        case error.UNKNOWN_ERROR:        geolocateCodeError = "An unknown error occurred.";                     break;
      }

      console.error(geolocateCodeError);
    };

    navigator.geolocation.getCurrentPosition(geolocateSuccess, geolocateError, {
      enableHighAccuracy: false,
      timeout: 20000
    });
  }

  useEffect(() => {
    promptForLocation()
    // getData()
  }, [])

  return (
    <Grid container>
      <Grid container className={classes.todayContainer}>
        <img
          src={ClearSkies}
          className={classes.todayContainerImage}
        />
      </Grid>
      <Grid container>

      </Grid>
    </Grid>
  );
}

export default withStyles(theme => ({
  todayContainer: {
    height: 300,
    backgroundImage: "url('/src/assets/images/clear_skies.jpeg')",
  },
  todayContainerImage: {
    objectFit: 'cover',
    width: '100%',
  }
}))(App);

