import { Directive, Renderer2, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements OnInit {


  target = this.elRef.nativeElement;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
    this.renderer.listen(this.target, 'keyup', ()=>{

      if(this.target.value.length>=this.target.maxLength){

        let next = this.target;
        while(next = next.nextElementSibling){
          if(next === null){
            break;
          }
          if(next.tagName.toLowerCase()==="input"){
            next.focus();
            break;
          }
        }
      }else if(this.target.value.length === 0){
        let prev = this.target;
        while(prev = prev.previousElementSibling){
          if(prev == null){
            break;
          }
          if(prev.tagName.toLowerCase()==="input"){
            prev.focus();
            break;
          }
        }
      }
    });
  }
}
