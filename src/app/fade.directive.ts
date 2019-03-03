import {Directive, Renderer2, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appFade]'
})
export class FadeDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    el.nativeElement.style.opacity = '.6';
    el.nativeElement.style.transition = '.4s opacity';
  }

  @HostListener('mouseover') mouseover() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
  }

  @HostListener('mouseout') mouseout() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '.6');
  }
}
