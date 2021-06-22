import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { StatusBar } = Plugins;
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  house = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/airbnb-course/detail.json').subscribe(res => {
      this.house = res;
      console.log('house: ', res);
    })
  }
  
  ionViewWillEnter() {
    StatusBar.setStyle({ style: StatusBarStyle.Dark });
  }

}
