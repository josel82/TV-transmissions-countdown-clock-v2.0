import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { CounterService } from "./counter.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  timeForm: FormGroup;
  isOnAir:boolean = false;
  isCounting:boolean = false;
  onAirTime;
  timezone:string;
  now = new Date();
  time;


  constructor(private counterService: CounterService) { }

  ngOnInit() {
    this.timeForm = new FormGroup({
      'hours' : new FormControl(null, [Validators.required,
                                       Validators.min(0),
                                       Validators.max(23),
                                       Validators.maxLength(2),
                                       Validators.pattern('^[0-9]+$')]),
      'minutes': new FormControl(null, [Validators.required,
                                        Validators.min(0),
                                        Validators.max(59),
                                        Validators.maxLength(2),
                                        Validators.pattern('^[0-9]+$')]),
      'seconds': new FormControl(null, [Validators.required,
                                        Validators.min(0),
                                        Validators.max(59),
                                        Validators.maxLength(2),
                                        Validators.pattern('^[0-9]+$')])
    });


    this.time = this.counterService.currentTime;

    this.timezone = this.counterService.timezone;

    this.counterService.timeUpdated.subscribe((time)=>{
      this.timeForm.setValue({
        'hours' : time.hour,
        'minutes' : time.min,
        'seconds' : time.sec
      })
    });
    this.counterService.flag.subscribe((flag)=>{
      this.isOnAir = flag;
    });
  }

  onStartCount(){


    let h = this.timeForm.controls.hours.value;
    let m = this.timeForm.controls.minutes.value;
    let s = this.timeForm.controls.seconds.value;

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
  this.timeForm.markAsUntouched();
}
invalidInputStyle(control){

  return {
    boxShadow: control.invalid&&control.touched ? '0 2px 5px 2px #f18282' : 'none',
    color: !this.isOnAir&&this.isCounting ? '#fe6468' : '#757575'
  }
}
}
