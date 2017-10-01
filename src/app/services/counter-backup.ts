import { Subject } from 'rxjs/Subject';

export class CounterService {

  timeUpdated = new Subject<any>();
  flag = new Subject<boolean>();
  countingDown = false;
  input: Date;
  _second = 1;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  timezone = this.getTimezone();
  dateObject: Date;
  currentTime  = {
    hours : '00',
    minutes : '00',
    seconds : '00'
  }

  //current time generator
  timeEngine = setInterval(()=>{
    if(this.countingDown){
      this.timeUpdated.next(this.diff(this.input, this.dateObject));
    }
    let interval = this.getTime();
    this.dateObject = interval.date;
    this.setTime(interval);
  }, 1000);

  getTime(){
    let date = new Date();
    let hours = ('00'+date.getHours()).slice(-2);
    let minutes = ('00'+date.getMinutes()).slice(-2);
    let seconds = ('00'+date.getSeconds()).slice(-2);

    return { hours, minutes, seconds, date };
  }

  setTime(interval){
    this.currentTime.hours = interval.hours;
    this.currentTime.minutes = interval.minutes;
    this.currentTime.seconds = interval.seconds;
  }

 //Countdown clock
  diff(t2,t1){
    let res = Math.abs(Math.floor((t2-t1)/1000)); // This line of code allows to sync the current time
                                                  // with the count down.
    if(res === 0 ){ //checks if the time is out
       this.flag.next(true); //turns the "On Air" sign on
    }
      //time difference calculation
      let hour = ('00'+Math.floor(res/this._hour)).slice(-2);
      let min = ('00'+Math.floor((res%this._hour)/this._minute)).slice(-2);
      let sec = ('00'+Math.floor(((res%this._minute)/this._second))).slice(-2);

      return { hour, min, sec };
  }

  getTimezone(){
    let date = new Date();
    let timezoneOffSet = date.getTimezoneOffset()/60*(-1);
    return timezoneOffSet < 0 ? timezoneOffSet.toString() : '+'+timezoneOffSet.toString();
  }

//Called when the start button is clicked
  setCounter(input){
    this.input = input;
    this.countingDown = true;
  }

//Called when the "clear" button is clicked
  onClear(){
    this.countingDown = false;
    this.flag.next(false);
    this.timeUpdated.next({
      hour: '00',
      min: '00',
      sec: '00'
    });
  }
}
