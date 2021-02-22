import {Grid} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";
import WeatherIcon from '@components/WeatherIcon'
import {whiteText} from '@styles';
import ServiceProvider from '@serviceProvider';
const DateService = ServiceProvider.make('date');
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
                  <Grid container>
                    <Grid item>
                    <span className={classes.temp}>
                      {temp}
                    </span>
                    </Grid>
                    <Grid item>
                      <span className={classes.degree}>&#176;</span>
                    </Grid>
                  </Grid>
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
      ...whiteText
    },
    todaysDesciption: {
      textAlign: 'center',
      ...whiteText
    },
    temp: {
      ...whiteText,
      fontSize: '2.5em'
    },
    degree: {
      fontSize: '2em',
      ...whiteText,
    },
    contentContainer: {
      height: '100%'
    }
  })
});
