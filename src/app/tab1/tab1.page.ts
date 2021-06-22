import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  home = null;

  opts = {
    slidesPerView: 1.4,
    slidesOffsetBefore: 15
  };

  catOpts = {
    slidesPerView: 1.3,
    spaceBetween: 20,
    slidesOffsetBefore: 25
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/airbnb-course/home.json').subscribe(res => {
      this.home = res;
      console.log('Home: ', res);
    });
  }

  ionViewWillEnter() {
    StatusBar.setStyle({ style: StatusBarStyle.Dark });
  }
}
