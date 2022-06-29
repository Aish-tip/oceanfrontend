import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { FishermanPage } from '../fisherman/fisherman.page';
import { threadId } from 'worker_threads';

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
    docksid:any
    l:any
  ngOnInit() {
    // console.log(this.navParams)
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user)
    this.http.get(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.ActiveUser = res;
      console.log(res)
      
    })

    
    this.http.get(`${Urls.FISHERMAN}?access_token=${this.user.id}`).subscribe(((res:any)=>{
      console.log(res);
      this.docksid = res;
      
    }))

    // for(let i=0;i<this.docksid.length;i++){
      // this.http.get(`${Urls.FISHERMAN}/${this.docksid}?access_token=${this.user.id}`).subscribe(((res:any)=>{
      //   console.log("fisherman",res);
      // }))
    // }
    
   
   
  }
  
}
