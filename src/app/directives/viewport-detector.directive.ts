import { Directive, Renderer2, HostBinding, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appViewportDetector]'
})
export class ViewportDetectorDirective implements OnInit{
  @Input() timeUnit;
  @HostBinding('innerHtml') innerHtml;
  constructor(private renderer:Renderer2) { }

    ngOnInit(){
      this.renderer.listen('window', 'load', (e)=>{

        if(e.currentTarget.innerWidth<=600){
          this.innerHtml = ':';
        }else{
          this.innerHtml = this.timeUnit;
        }
      });
      this.renderer.listen('window', 'resize', (e)=>{
        if(e.currentTarget.innerWidth<=600){
          this.innerHtml = ':';
        }else{
          this.innerHtml = this.timeUnit;
        }
      });
    }

}
