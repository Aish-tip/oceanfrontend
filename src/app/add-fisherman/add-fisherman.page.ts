import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';

@Component({
  selector: 'app-add-fisherman',
  templateUrl: './add-fisherman.page.html',
  styleUrls: ['./add-fisherman.page.scss'],
})
export class AddFishermanPage implements OnInit {

  constructor(private http:HttpClient) { }
  user:any
  ActiveUser:any
  dockList:any
  selectedcenters: any;
  tempId = "6285c34e4108c2667cab6a3b";
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
    this.http.get(`${Urls.DOCKS}?access_token=${this.user.id}`).subscribe((res: any) => {
      console.log("DOCK List=> ", res)
      this.dockList = res;
    })
  }

  addfisherman(d){
    console.log(d);
    var n = d.form.value.name;
    var m = d.form.value.mobile;
    var a = d.form.value.address;
    var dob = d.form.value.dob;
    const did = d.form.value.selectedcenters;
    this.http.post(`${Urls.FISHERMAN}?access_token=${this.user.id}`,
    {name:n, contactNum:m, address:a, dob:dob, docksId:did}).subscribe(res=>{
      console.log(res);
      location.reload();
    })
  }

}
