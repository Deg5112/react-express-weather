import {Grid} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";
import WeatherIcon from '@components/WeatherIcon'
import ServiceProvider from '@serviceProvider';
const DateService = ServiceProvider.make('date');
import Temp from '@components/Temp'
import CustomConnect from '@store/connect/CustomConnect'

const TodaysWeather = ({classes}) => {
  const weatherData = useSelector(state => state.weather.weatherData);
  if (!weatherData) {
    return null;
  }

  const {current: {temp, sunrise, sunset, weather}} = weatherData;
  const {description, icon} = weather[0];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Grid
              container
              direction={"column"}
              alignItems={"center"}
              justify={"center"}
              className={classes.contentContainer}
            >
              <Grid item>
                <WeatherIcon icon={icon} big={true} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction={"column"}
              alignItems={"center"}
              justify={"center"}
              className={classes.contentContainer}
            >
              <Grid item>
                <Grid item>
                  <Temp temp={temp} big={true} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Grid
            container
            direction={"column"}
            alignItems={"center"}
            justify={"center"}
            className={classes.contentContainer}
          >
            <Grid item>
              <p className={classes.todaysDate}>
                {`${DateService.currentDay()} ${DateService.isDay(sunrise, sunset) ? 'Today' : 'Night'}`}
              </p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <p className={classes.todaysDesciption}>{description}</p>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CustomConnect({
  component: TodaysWeather,
  styles: theme => ({
    todaysDate: {
      textAlign: 'center',
    },
    todaysDesciption: {
      textAlign: 'center',
    },
    temp: {
      fontSize: '2.5em'
    },
    degree: {
      fontSize: '2em',
    },
    contentContainer: {
      height: '100%'
    }
  })
});
