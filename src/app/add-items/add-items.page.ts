import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArrayName, FormsModule } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Urls } from '../constants/urls';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.page.html',
  styleUrls: ['./add-items.page.scss'],
})
export class AddItemsPage implements OnInit {
  dataValue: any;
  fisherman: any;
  wasteItemsList: any;
  resp: any;
  weight: any = [];
  rate: any = [];
  total: any;
  tmp: any[] = []
  // tempWaste: any;
  constructor(
    private modalController: ModalController,
    private datePipe: DatePipe,
    public navParams: NavParams,
    private http: HttpClient,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    console.log(this.navParams)
    this.dataValue = this.navParams;
    this.http.get(`${Urls.FISHERMAN}/${this.navParams.data[0]}?access_token=${this.navParams.data[1].id}`).subscribe(((res: any) => {
      console.log(res)
      this.fisherman = res;
      this.http.get(`${Urls.WLIST}?access_token=${this.navParams.data[1].id}`).subscribe((res) => {
        this.wasteItemsList = res;
        console.log(this.wasteItemsList)
        this.tempData(this.wasteItemsList);

      })
    }))
  }

  tempData(w) {
    // var tmp = [];

    for (var i = 0; i < w.length; i++) {
      var tempWaste = {
        "name": '',
        "weight": NaN,
        "rate": NaN,
        "total": NaN
      }
      tempWaste.name = w[i].name;
      this.tmp = this.tmp.concat(tempWaste);
      console.log(w[i])
    }
    console.log(this.tmp)
  }
  chngeweight(e, i) {
    console.log(e.detail.value, i)
    // console.log(e)
    this.tmp[i].weight = e.detail.value;
    this.tmp[i].total = this.tmp[i].weight * this.tmp[i].rate;
    console.log(this.tmp)
  }
  chngerate(e, i) {
    console.log(e.detail.value, i)
    // console.log(e)
    this.tmp[i].rate = e.detail.value;
    this.tmp[i].total = this.tmp[i].weight * this.tmp[i].rate;
    console.log(this.tmp)
  }
  saveData(data) {
    console.log(this.tmp)
    var ttl = 0;
    // console.log(data)
    // tempWaste = this.wasteItemsList;
    // this.wasteItemsList.forEach((element, i) => {
    //   tempWaste.name = element.name;
    //   console.log(element, i)
    //   tmp[i].push(tempWaste);
    //   console.log(tmp)
    // });

    // let sum = 0;
    // console.log(this.weight);
    // console.log(this.rate);
    // for (let i = 0; i < this.weight.length; i++) {
    //   console.log(typeof this.weight[i], typeof this.rate[i])
    //   sum = sum + (this.weight[i] * this.rate[i]);
    // }
    // console.log(sum);
    // var total = sum;
    this.tmp.forEach(element => {
      console.log(element)
      element.fishermanId = this.fisherman.id;
      console.log(element)
      this.http.post<any>(`${Urls.FISHERMAN}/${this.fisherman.id}/wasteCollecteds?access_token=${this.navParams.data[1].id}`, {
        "name": element.name,
        "quantity": element.weight,
        "rate": element.rate,
        "total": element.total,
        "fishermanId": this.fisherman.id
      })
        .subscribe(res => {
          console.log(res);

        });
      ttl = ttl + element.total;
      console.log(element.total)


    });
    // console.log(ttl)
    this.http.get(`${Urls.FISHERMAN}/${this.navParams.data[0]}/transactions?access_token=${this.navParams.data[1].id}`).subscribe(((res: any) => {
      console.log(res, res.length);
      // res[0].balance = res[0].balance + element.total;
      if (res.length == 0) {
        this.http.post(`${Urls.FISHERMAN}/${this.navParams.data[0]}/transactions?access_token=${this.navParams.data[1].id}`,
          {
            "balance": ttl,
            "amount": [

            ],
            "fishermanId": this.fisherman.id
          }
        ).subscribe(((res: any) => {
          console.log(res)

        }))
      } else {
        ttl = ttl + res[0].balance;
        this.http.patch(`${Urls.TRANSACTION}/${res[0].id}?access_token=${this.navParams.data[1].id}`,
          {
            "balance": ttl
          }
        ).subscribe(((res: any) => {
          console.log(res)

        }))
      }

    }))
    this.closeModalNodata()
  }
  async closeModalNodata() {
    console.log("Close")
    await this.modalController.dismiss();
  }
}





