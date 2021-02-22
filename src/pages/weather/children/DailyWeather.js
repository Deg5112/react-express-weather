import {Grid} from "@material-ui/core";
import React from "react";
import {useSelector} from "react-redux";
import WeatherIcon from '@components/WeatherIcon'
import {whiteText} from '@styles';
import ServiceProvider from '@serviceProvider';
const DateService = ServiceProvider.make('date');
import CustomConnect from '@store/connect/CustomConnect'

const DailyWeather = ({classes}) => {
  const weatherData = useSelector(state => state.weather.weatherData);
  if (!weatherData) {
    return null;
  }

  const {daily} = weatherData;

  return (
    <Grid
      id="hourly-container"
      container
      className={classes.dailyContainer}
      justify={"space-around"}
    >
      {
        daily.map(({dt, temp: {min, max}, weather}, index) => {
          return (
            <Grid item xs={12} sm={5} key={dt} className={classes.dailyItem}>
              <Grid container justify={"center"} alignItems={"center"}>
                <Grid item xs={2}>
                  <Grid container alignItems={"center"} justify={"center"}>
                    <Grid item>
                      {DateService.getDayFromUnix(dt)}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container justify={"center"}>
                    <Grid item>
                      <WeatherIcon icon={weather[0].icon} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid container alignItems={"center"} justify={"center"}>
                    <Grid item>
                      {Math.round(max)}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid container alignItems={"center"} justify={"center"}>
                    <Grid item>
                      {Math.round(min)}
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
  component: DailyWeather,
  styles: theme => ({
    dailyContainer: {
      ...whiteText
    },
    dailyItem: {
      padding: 15
    },
    todaysDate: {
      textAlign: 'center',
    },
    todaysDesciption: {
      textAlign: 'center',
    },
    hourlyItem: {
      width: 100
    }
  })
});
