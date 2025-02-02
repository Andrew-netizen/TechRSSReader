import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit{

  constructor(private host: ElementRef) {}

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }

}
