import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { CounterService } from "./services/counter.service";
import { TimeService } from "./services/time.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  timeForm: FormGroup;
  hoursControl;
  minutesControl;
  secondsControl;
  isOnAir:boolean = false;
  isCounting:boolean = false;
  onAirTime;
  timezone:string;
  now = new Date();
  time = {
    hours: '00',
    minutes: '00',
    seconds: '00'
  }


  constructor(private counterService: CounterService,
              private timeService: TimeService) { }

//Initialization
  ngOnInit() {

    this.timeForm = new FormGroup({
      'hours' : new FormControl(null, [Validators.min(0),
                                       Validators.max(23),
                                       Validators.maxLength(2),
                                       Validators.pattern('^[0-9]+$')]),
      'minutes': new FormControl(null, [Validators.min(0),
                                        Validators.max(59),
                                        Validators.maxLength(2),
                                        Validators.pattern('^[0-9]+$')]),
      'seconds': new FormControl(null, [Validators.min(0),
                                        Validators.max(59),
                                        Validators.maxLength(2),
                                        Validators.pattern('^[0-9]+$')])
    });

    this.timeService.timeInterval.subscribe((time)=>{
      this.time = time;
    });

    this.timezone = this.timeService.timezone;

    this.counterService.countUpdated.subscribe((time)=>{
      this.timeForm.setValue({
        'hours' : time.hour,
        'minutes' : time.min,
        'seconds' : time.sec
      });
    });

    this.hoursControl = this.timeForm.controls.hours;
    this.minutesControl = this.timeForm.controls.minutes;
    this.secondsControl = this.timeForm.controls.seconds;

    this.counterService.flag.subscribe((flag)=>{
      this.isOnAir = flag;
    });
  }


  onStartCount(){

    let hInput = this.timeForm.controls.hours.value;
    let mInput = this.timeForm.controls.minutes.value;
    let sInput = this.timeForm.controls.seconds.value;

    let h = hInput === null ? 0 : hInput;
    let m = mInput === null ? 0 : mInput;
    let s = sInput === null ? 0 : sInput;

    if(this.timeForm.invalid){
      alert('Invalid input!');
    }else{
      this.isCounting = true;
      let targetTime = new Date();

      targetTime.setHours(h);
      targetTime.setMinutes(m);
      targetTime.setSeconds(s);
      if(targetTime < this.now){ //checks if the input time is less than the current time
        targetTime.setDate(this.now.getDate()+1); // sets the input time to the next day
      }
      this.counterService.setCounter(targetTime);
      this.onAirTime = {
        h: ('00'+h).slice(-2),
        m: ('00'+m).slice(-2),
        s: ('00'+s).slice(-2)
      };
    }
}

onClearCount(){
  this.counterService.onClear();
  this.timeForm.patchValue({
    'hours':'',
    'minutes':'',
    'seconds':''
  });
  this.onAirTime = null;
  this.isCounting = false;
  this.isOnAir = false;
  this.timeForm.reset();
}

}
