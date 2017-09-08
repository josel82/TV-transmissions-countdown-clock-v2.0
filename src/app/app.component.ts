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
  time: Object;
  isOnAir:boolean = false;
  onAirTime:Object;
  timezoneOffset:number;


  constructor(private counterService: CounterService) { }

  ngOnInit() {
    this.timeForm = new FormGroup({
      'hours' : new FormControl(null, [Validators.required,
                                       Validators.min(0),
                                       Validators.max(23),
                                       Validators.minLength(2)]),
      'minutes': new FormControl(null, [Validators.required,
                                        Validators.min(0),
                                        Validators.max(59),
                                        Validators.minLength(2)]),
      'seconds': new FormControl(null, [Validators.required,
                                        Validators.min(0), 
                                        Validators.max(59),
                                        Validators.minLength(2)])
    });

    this.time = this.counterService.time;
    this.timezoneOffset = this.counterService.timezoneOffset;

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
      let targetTime = new Date();
      targetTime.setHours(h);
      targetTime.setMinutes(m);
      targetTime.setSeconds(s);
      this.counterService.setCounter(targetTime);
      this.onAirTime = {h,m,s};
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
  this.timeForm.markAsUntouched();
}
invalidInputStyle(control){
  return {
    boxShadow: control.invalid&&control.touched ? '0 2px 5px 2px #f18282' : 'none'
  }
}
}
