import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { TimeService } from './time.service';

@Injectable()

export class CounterService {

  countUpdated = new Subject<any>();
  flag = new Subject<boolean>();
  countingDown = false;
  input: Date;
  _second = 1;
  _minute = this._second * 60;
  _hour = this._minute * 60;

  constructor(private timeService: TimeService){}

  //current time generator
  timeEngine = setInterval(()=>{
    let interval = this.timeService.getTime();
    this.timeService.setTime(interval);
    if(this.countingDown){
      this.countUpdated.next(this.diff(this.input, interval.date));
    }
  }, 1000);

 //Countdown clock
  diff(t2,t1){
    let res = Math.abs(Math.floor((t2/1000))- Math.floor((t1/1000))); // This line of code allows to sync the current time
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

//Called when the start button is clicked
  setCounter(input){
    this.input = input;
    this.countingDown = true;
  }

//Called when the "clear" button is clicked
  onClear(){
    this.countingDown = false;
    this.flag.next(false);
    this.countUpdated.next({
      hour: '00',
      min: '00',
      sec: '00'
    });
  }
}
