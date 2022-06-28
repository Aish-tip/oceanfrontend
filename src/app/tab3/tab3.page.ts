import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { FishermanPage } from '../fisherman/fisherman.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers :[NavParams]
})
export class Tab3Page {

  user:any
  ActiveUser:any
  getDocks:any
  constructor(public modalController: ModalController,
    public toastController: ToastController,
    public http : HttpClient,
    public navParams : NavParams
    
  ) { }
    dataValue:any
    fishermanList:any
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user)
    this.http.get(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.ActiveUser = res;
      console.log(res)
      
    })

    console.log(this.navParams)
    this.dataValue = this.navParams;
    this.http.get(`${Urls.DOCKS}/${this.navParams.data[0].id}/fishermans?access_token=${this.navParams.data[1].id}`)
    .subscribe(((res: any) => {
      console.log(res)
      this.fishermanList = res;
    }))
    this.getDocks();
   
  }
  
}
