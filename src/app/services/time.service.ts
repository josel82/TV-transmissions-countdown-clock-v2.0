import { Subject } from 'rxjs/Subject';
export class TimeService {

  timeInterval = new Subject<any>()
  timezone = this.getTimezone();

  getTime(){
    let date = new Date();
    let hours = ('00'+date.getHours()).slice(-2);
    let minutes = ('00'+date.getMinutes()).slice(-2);
    let seconds = ('00'+date.getSeconds()).slice(-2);

    return { hours, minutes, seconds, date };
  }

  setTime(interval){
    this.timeInterval.next({
      hours: interval.hours,
      minutes: interval.minutes,
      seconds: interval.seconds
    });
  }

  getTimezone(){
    let date = new Date();
    let timezoneOffSet = date.getTimezoneOffset()/60*(-1);
    return timezoneOffSet < 0 ? timezoneOffSet.toString() : '+'+timezoneOffSet.toString();
  }

}
