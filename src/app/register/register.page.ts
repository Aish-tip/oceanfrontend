import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Urls } from '../constants/urls';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  allCenters: any;
  flag = false;
  cenId: [string];
  centers: [];
  selectedcenters: any;
  selectedrole: any;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {

  }
  register(v) {
    console.log(v)
    this.authService.register(v.form.value.email, v.form.value.password, v.form.value.age, v.form.value.gender, v.form.value.username, v.form.value.mobile, v.form.value.bloodgroup)
      .subscribe(
        data => {

          this.router.navigate(['/login']);
          console.log(data);

        },
        error => {
          console.log(error, v);
        });
  }

}
