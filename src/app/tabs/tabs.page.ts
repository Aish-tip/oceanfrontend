import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { ToastController } from '@ionic/angular';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { FishermanPage } from '../fisherman/fisherman.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  user: any;
  constructor(
    private authService: AuthService,
    private http: HttpClient, private router: Router,
    public toastController: ToastController,
    public modalController: ModalController
  ) { }
  barcode() {
    this.router.navigate(['/tabs/barcode'])
  }
  
  async onClickDock(d, e) {
    const modal = await this.modalController.create({
      component: FishermanPage,
      componentProps: [d, this.user]
    });
    return await modal.present();
    // this.http.get(`${Urls.DOCKS}/${d.id}/fishermans?access_token=${this.user.id}`).subscribe((res => {
    //   console.log(res)
    // }))
  }
  
}
