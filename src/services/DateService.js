import moment from 'moment'

class DateService {
  currentDay() {
    return moment().local().format('dddd Do MMMM YYYY')
  }
}

export default DateService;
