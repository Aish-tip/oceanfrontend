import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Urls } from '../constants/urls';


@Component({
  selector: 'app-setting-tab',
  templateUrl: './setting-tab.page.html',
  styleUrls: ['./setting-tab.page.scss'],
})
export class SettingTabPage implements OnInit {

  constructor(

    private authService: AuthService,
    private http: HttpClient, private router: Router,
    private loadingCtrl: LoadingController,
    public modalController: ModalController,
    public toastController: ToastController
  ) { }
  user: any;
  ActiveUser: any;
  dockList: any;
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
    this.getDocks();
  }

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  getDocks() {
    this.http.get(`${Urls.DOCKS}?access_token=${this.user.id}`).subscribe((res: any) => {
      console.log("DOCK List=> ", res)
      this.dockList = res;
    })
  }
  LogOut() {
    this.authService.logout(this.user);
    localStorage.removeItem('currentUser');

    // window.location.reload();
    this.router.navigate(['/login']);

  }
}
