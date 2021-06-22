import { Directive, Input, Renderer2, OnInit, HostListener } from '@angular/core';
import { DomController, isPlatform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { StatusBar } = Plugins;

@Directive({
  selector: '[appStickySearch]'
})
export class StickySearchDirective implements OnInit {
  @Input('appStickySearch') searchEl: any;
  private backgroundEl: any;

  constructor(private renderer: Renderer2, private domCtrl: DomController) { }

  ngOnInit() {
    this.backgroundEl = this.searchEl.getElementsByClassName('background')[0];    
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    const currentY = $event.detail.currentY;
    
    let move = 0;
    let opacity = 0;
    if (currentY > 300 && currentY <= 430) {
      move = (currentY - 300) / 1.6;
      opacity = (currentY - 300) / 130;
    }
    
    this.domCtrl.write(() => {
      if (move != 0) {
        this.renderer.setStyle(this.searchEl, 'webkitTransform',
        `translate3d(0, -${move}px, 0)`)
        this.renderer.setStyle(this.backgroundEl, 'opacity', opacity);
        document.documentElement.style.setProperty('--ion-item-background', '#F6F6F6')
      }
      if (currentY < 300) {
        document.documentElement.style.setProperty('--ion-item-background', '#FFF')
      }
    });

    if (isPlatform('mobile')) {
      if (currentY > 360) {
        StatusBar.setStyle({ style: StatusBarStyle.Light });
      } else {
        StatusBar.setStyle({ style: StatusBarStyle.Dark });
      }
    }

  }
}
