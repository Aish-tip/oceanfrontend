import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-fisherman',
  templateUrl: './fisherman.page.html',
  styleUrls: ['./fisherman.page.scss'],
})
export class FishermanPage implements OnInit {
  inputData: any;
  encodedData: '';
  modalTitle: string;
  modelValue: number;
  modelRemark: string;
  dataValue: any;
  fishermanList: any;
  queryF = false;
  constructor(
    private modalController: ModalController,
    private datePipe: DatePipe,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private http: HttpClient,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    console.log(this.navParams)
    this.dataValue = this.navParams;
    this.http.get(`${Urls.DOCKS}/${this.navParams.data[0].id}/fishermans?access_token=${this.navParams.data[1].id}`).subscribe(((res: any) => {
      console.log(res)
      this.fishermanList = res;
    }))
  }
  async closeModalNodata() {
    console.log("Close")
    await this.modalController.dismiss();
  }
  generateqr(c) {
    console.log(c)
    this.inputData = {
      "name": c.name,
      "id": c.id
    }
    console.log(this.inputData)
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.inputData).then((encodedData) => {
      console.log(encodedData);
      this.encodedData = encodedData; ``
    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }
  fshman: any;
  queryAcronyms(ev: any) {
    this.queryF = true;
    this.fshman = this.fishermanList;
    var q = [];
    console.log(ev.target.value);
    const val = ev.target.value;
    if (val && val.trim() != "") {
      this.fshman = this.fishermanList.filter((item) => {
        // q.push(item)
        // console.log(item)
        // console.log(q)
        // return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return (
          item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.id.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
      console.log(this.fshman);
    }
    // this.http.get(`${Urls.PATIENT}`).subscribe((res: any) => {
    //   this.patientList = res;
    //   console.log(this.patientList)
    // })
  }


  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }
}



