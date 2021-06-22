import { Directive, HostListener } from '@angular/core';
import { isPlatform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { StatusBar } = Plugins;

@Directive({
  selector: '[appDynamicStatusBar]'
})
export class DynamicStatusBarDirective {

  constructor() { }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    const currentY = $event.detail.currentY;

    if (isPlatform('ios') || isPlatform('android')) {
      if (currentY > 150) {
        StatusBar.setStyle({ style: StatusBarStyle.Light });
      } else {
        StatusBar.setStyle({ style: StatusBarStyle.Dark });
      }
    }

  }
}
