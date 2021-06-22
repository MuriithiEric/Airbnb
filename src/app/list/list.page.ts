import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { FilterModalPage } from '../filter-modal/filter-modal.page';
declare var google: any;
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, AfterViewInit {
  data = [];
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  @ViewChild('drawer', { read: ElementRef}) drawer: ElementRef;
  isOpen = true;

  constructor(private http: HttpClient, private plt: Platform, private modalCtrl: ModalController, private routerOutlet: IonRouterOutlet) { }

  ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/airbnb-course/list.json').subscribe((res: any) => {
      this.data = res.results;
      console.log('data: ', res);
    });
  }

  ngAfterViewInit() {
    const mapOptions = {
      center: new google.maps.LatLng(51.9500019, 7.4836732),
      zoom: 7,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  toggleDrawer() {
    const drawer = this.drawer.nativeElement;

    if (!this.isOpen) {
      drawer.style.transition = '.4s ease-out';
      drawer.style.transform = ``;
    } else {
      drawer.style.transition = '.4s ease-in';
      drawer.style.transform = `translateY(${this.plt.height() - 300}px)`;
    }
    this.isOpen = !this.isOpen;
  }

  async openFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterModalPage,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true
    });
    await modal.present();
  }

  ionViewWillEnter() {
    StatusBar.setStyle({ style: StatusBarStyle.Light});
  }
}
