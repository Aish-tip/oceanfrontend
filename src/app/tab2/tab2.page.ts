import { Component } from '@angular/core';
import { Urls } from '../constants/urls';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  user:any
  ActiveUser:any
  wasteItemsList:any
  alertController: any;
  constructor(private http: HttpClient) {}
  
  ngOnInit(){
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
      console.log(res);
      this.wasteItemsList = res;

    })
  }
  updatedlist:any;
  editdetails(d) {
    const t =  document.getElementById("update");
    if(t){
      t.style.display="none";
    }
    // var name = d.form.value.name;
    var rate = d.form.value.rate;
    this.http.patch(`${Urls.WLIST}/${this.itemid}?access_token=${this.user.id}`,{
      rate: rate
    }).subscribe(res=>{
      console.log(res)
      this.updatedlist =res;
      console.log(this.updatedlist)
    })
    
  }
  itemid:any
  itemname:any
  showeditdetails(i){
    console.log(i);
    this.itemid = i.id;
    this.itemname = i.name;
    console.log("test")
    const t2 = document.getElementById("update");
    if(t2){
      t2.style.display="block";
    }
  }

  
  

}
