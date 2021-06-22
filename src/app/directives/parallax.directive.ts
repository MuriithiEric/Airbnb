import { Directive, Input, Renderer2, OnInit, HostListener } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective implements OnInit {
  @Input('appParallax') imageEl: any;
  private overlayEl: any;
  @Input('useOffset') useOffset = true;

  constructor(private renderer: Renderer2, private domCtrl: DomController) { }

  ngOnInit() {
    this.overlayEl = this.imageEl.getElementsByClassName('overlay')[0];
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    const scrollTop = $event.detail.scrollTop;
    let moveImage = scrollTop / 1.6;
    let scaleImage = 0;
    const base = scrollTop - (+this.useOffset * 250);
    const opacity = Math.max(0, base / 200);
    
    if (scrollTop > 0) {
      scaleImage = 1;
    } else {
      scaleImage = -scrollTop / 1000 + 1;
    }

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.imageEl, 'webkitTransform', `translate3d(0, ${moveImage}px, 0) 
      scale(${scaleImage}, ${scaleImage})`);
      this.renderer.setStyle(this.overlayEl, 'opacity', opacity);
    });
  }
}
