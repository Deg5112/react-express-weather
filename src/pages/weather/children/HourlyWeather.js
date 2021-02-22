import {Grid} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";
import WeatherIcon from '@components/WeatherIcon'
import {whiteText} from '@styles';
import ServiceProvider from '@serviceProvider';
const DateService = ServiceProvider.make('date');
import CustomConnect from '@store/connect/CustomConnect'

const HourlyWeather = ({classes}) => {
  const weatherData = useSelector(state => state.weather.weatherData);
  if (!weatherData) {
    return null;
  }

  const {hourly} = weatherData;

  return (
    <Grid
      id="hourly-container"
      container
      wrap={"nowrap"}
      className={classes.hourlyContainer}
    >
      {
        hourly.map(({dt, temp, weather}, index) => {
          return (
            <Grid item key={dt}>
              <Grid container className={classes.hourlyItem} direction={"column"} alignItems={"center"} justify={"center"}>
                <Grid item className={classes.hourlyTime}>
                  { index === 0 ? 'Now' : DateService.getTimeFromUnix(dt) }
                </Grid>
                <Grid item>
                  <WeatherIcon icon={weather[0].icon} />
                </Grid>
                <Grid item>
                  <Grid container alignItems={"center"}>
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
          )
        })
      }
    </Grid>
  )
}

export default CustomConnect({
  component: HourlyWeather,
  styles: theme => ({
    todaysDate: {
      textAlign: 'center',
    },
    todaysDesciption: {
      textAlign: 'center',
    },
    hourlyContainer: {
      borderBottom: '1px solid white',
      borderTop: '1px solid white',
      overflowX: 'scroll',
      padding: 15,
      ...whiteText,
    },
    hourlyItem: {
      width: 100
    }
  })
});
