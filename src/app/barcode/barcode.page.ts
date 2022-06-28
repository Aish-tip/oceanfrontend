import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { DatePipe } from "@angular/common";

import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { ToastController, ModalController, NavParams } from '@ionic/angular';
import { Urls } from '../constants/urls';
import { AddItemsPage } from '../add-items/add-items.page';
import { AddAmountPage } from '../add-amount/add-amount.page';
import { $ } from 'protractor';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.page.html',
  styleUrls: ['./barcode.page.scss'],
  providers:[NavParams]
})
export class BarcodePage implements OnInit {
  scannedData: any;
  encodedData: '';
  encodeData: any;
  inputData: any;
  id: string;
  name: string;
  user: any;
  ActiveUser: any;
  fisherman: any;
  photos = true;
  items = false;
  amounts = false;
  wasteItemsList: any;
  wasteCollected: any;
  tempId = "6285c34e4108c2667cab6a3b";
  productimages = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  transactions: any;
  paid: any;
  constructor(private http: HttpClient,
    private barcodeScanner: BarcodeScanner,
    private datePipe: DatePipe,
    public modalController: ModalController,
    public toastController: ToastController,
    public navParams : NavParams,
    private router: Router,) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user)
    this.http.get(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.ActiveUser = res;
      console.log(res)
      // this.ActiveUser.AccountName = res.username;
      // this.ActiveUser.role = res.role;
      // this.ActiveUser.DOB = res.DOB;
      // this.ActiveUser.email = res.email;
      /*----------------- PATIENT LIST ------------------------------------*/
    })
    this.http.get(`${Urls.WLIST}?access_token=${this.user.id}`).subscribe((res) => {
      this.wasteItemsList = res;
      console.log(this.wasteItemsList)

    })
    console.log("Call scan")
    this.scanBarcode()
    this.func_items("");
    this.func_amounts("");
  }
  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      saveHistory: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };
    this.barcodeScanner.scan(options).then((barcodeData: any) => {
      this.scannedData = JSON.parse(barcodeData.text);
      console.log('Barcode data', barcodeData.text);
      console.log('Barcode data Scanned Id', barcodeData.text);
      console.log('Barcode data Scanned json', this.scannedData.name);
      console.log('Barcode data Scanned json', this.scannedData.id);
      // this.callFisherman(this.scannedData.id);
    }).catch(err => {
      console.log('Error', err);
      this.callFisherman(this.tempId);

    });
  }
  callFisherman(id) {
    this.http.get(`${Urls.FISHERMAN}/${id}?access_token=${this.user.id}`).subscribe((res => {
      console.log(res);
      this.fisherman = res;
    }))
  }
  func_photos(e) {
    console.log(e)
    this.photos = true;
    this.items = false;
    this.amounts = false;
  }
  totalp: any;
  func_items(e) {
    console.log(e)
    this.http.get(`${Urls.FISHERMAN}/${this.tempId}/wasteCollecteds?access_token=${this.user.id}`).subscribe((res => {
      console.log(res);
      this.wasteCollected = res;
    }))
    this.photos = false;
    this.items = true;
    this.amounts = false;
  }
  plastic:any
  itemlist:any
  getItemList(i){
    console.log(i);
    this.http.get(`${Urls.WCOLLECTED}?filter[where][name]=${i.name}&access_token=${this.user.id}`)
          .subscribe((res=> { 
          console.log(res);
          this.itemlist = res;      
        }));
     
  }
  func_amounts(e) {
    this.paid = 0;
    console.log(e, this.wasteCollected)
    if (this.wasteCollected == undefined) {
      this.http.get(`${Urls.FISHERMAN}/${this.tempId}/wasteCollecteds?access_token=${this.user.id}`).subscribe((res => {
        console.log(res);
        this.wasteCollected = res;
        this.calcttl()
      }))
    }
    this.http.get(`${Urls.FISHERMAN}/${this.tempId}/transactions?access_token=${this.user.id}`).subscribe((res => {
      console.log(res);
      this.transactions = res;
      this.transactions.forEach(element => {
        element.amount.forEach(amt => {
          this.paid = this.paid + amt.Amount;
        });
      });
      this.calcttl()
    }))
    this.photos = false;
    this.items = false;
    this.amounts = true;
  }
  Balance: any;
  calcttl() {
    if (this.wasteCollected != undefined && this.transactions != undefined) {
      // var ttl = 0;
      // this.wasteCollected.forEach(element => {
      //   ttl = ttl + element.total;
      // });
      // console.log(ttl)
      // this.Balance = ttl;
      this.http.get(`${Urls.FISHERMAN}/${this.tempId}/transactions?access_token=${this.user.id}`).subscribe(((res: any) => {
        console.log(res);
        this.Balance = res[0].balance;
        // this.calcttl()
      }))
    }
  }
  copy(fid) {
    console.log(fid)
    //  var copyText = document.getElementById("pwd_spn");
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = fid;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.presentToast("Copied ID = " + fid, "success")

  }
  async addItems(fid) {
    console.log(fid)
    // this.router.navigate(['/tabs/add-items/' + fid])
    const modal = await this.modalController.create({
      component: AddItemsPage,
      componentProps: [fid, this.user]
    });
    modal.onDidDismiss().then((data) => {
      console.log(data)
      this.ngOnInit()
    });
    return await modal.present();
  }
  async addAmounts(fid) {
    console.log(fid)
    const modal = await this.modalController.create({
      component: AddAmountPage,
      componentProps: [fid, this.user]
    });
    modal.onDidDismiss().then((data) => {
      console.log(data)
      this.ngOnInit()
    });
    return await modal.present();
  }
  async presentToast(d, c) {
    const toast = await this.toastController.create({
      message: d,
      duration: 1000,
      position: 'top',
      cssClass: 'normalToast',
      color: c
    });
    toast.present();
  }
  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
