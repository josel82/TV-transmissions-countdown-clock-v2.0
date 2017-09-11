import { Directive, OnInit, HostBinding, Input, OnChanges, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit, OnChanges{

  @Input('appHighlight') highlight: boolean = false
  @Input() appInvalid: boolean = false;

  @HostBinding('style.color') textColor: string;
  @HostBinding('style.boxShadow') boxShadow: string;

  constructor(private elRef: ElementRef){}
  ngOnInit(){
    this.textColor = '#757575';
    this.boxShadow = 'none';
  }

  ngOnChanges(){
    if(this.highlight){
      this.textColor = '#fe6468';
    }else{
      this.textColor = '#757575';
    }
    if(this.appInvalid){
      this.boxShadow = '0 2px 5px 2px #f18282';
    }else{
      this.boxShadow = 'none';
    }
  }
}
