import React from 'react';
import './App.css';
import {Grid} from '@material-ui/core'
import moment from 'moment';
window.moment = moment;
import { CircularProgress } from '@material-ui/core';
import WeatherPage from '@pages/weather/WeatherPage';
import { Provider } from "react-redux";
import store from "@store"
window.store = store;
import Loader from '@components/Loader'

const App = () => {
  return (
    <Grid container>
      <Provider store={store()}>
        <WeatherPage />
        <Loader />
      </Provider>
    </Grid>
  );
}

export default App

