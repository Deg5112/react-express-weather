import React from 'react'

const WeatherIcon = ({icon}) => (
  <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
)

export default WeatherIcon
