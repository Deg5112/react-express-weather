import moment from 'moment'

class DateService {
  currentDay() {
    return moment().local().format('dddd')
  }

  isDay(sunRiseUnix, sundownUnix) {
    const now = moment();
    return now > moment.unix(sunRiseUnix) && now < moment.unix(sundownUnix)
  }

  isNight(sunRiseUnix, sundownUnix) {
    const now = moment();
    return now > moment.unix(sundownUnix) && now < moment.unix(sunRiseUnix)
  }

  getTimeFromUnix(timestamp) {
    return moment.unix(timestamp).local().format("hA");
  }

  getDayFromUnix(timestamp) {
    return moment.unix(timestamp).local().format("dddd");
  }
}

export default DateService;
