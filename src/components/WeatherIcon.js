import React from 'react'
//
const WeatherIcon = ({icon, big}) => {
 let size = '';
 if (big) {
   size = '@2x'
 }

 return (
   <img src={`https://openweathermap.org/img/wn/${icon}${size}.png`}/>
 )
}

export default WeatherIcon
