import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Urls } from './constants/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oldCv: any;
  regus: any;
  regdat: any;
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    // console.log(email, password)
    return this.http.post<any>(`${Urls.LOGIN}`, { email, password, returnSecureToken: true })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.http.get(`${Urls.USERS}/${user.userId}?access_token=${user.id}`).subscribe(res => {
          let data: any = res;
          localStorage.setItem("userName", data.username);
        });
        // console.log(user);
        // login successful if there's a jwt token in the response
        if (user && user.id) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.router.navigate(['/tabs']);
        return user;
      }));
  }
  logout(u) {
    // localStorage.removeItem('currentUser');
    // this.router.navigate(['/login']);
    this.http.post<any>(`${Urls.LOGOUT}?access_token=${u.id}`, {}).subscribe((res: any) => {
      console.log(res);
      console.log("Logged out");
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userName');
      this.router.navigate(['/login']);
    })

  }

  register(email: string, password: string, age: number, gender: string, username: string, mobile: number, bloodgroup: string) {
    console.log(email, password, age, gender, username, bloodgroup, mobile);
    let centerId = '';

    // if (role === 'admin') {
    //   centerId = localStorage.getItem('selectedCenterId');
    // }
    // else {
    //   centerId = centers[0];
    // }

    // console.log(centerId);

    return this.http.post<any>(`${Urls.USERS}`, { name: username, email: email, contactNum: mobile, boloodgroup: bloodgroup, password: password, age: age, gender: gender, username: username, emailverified: true })
      .pipe(map(user => {
        let userName = {
          "name": user.username,
          // "kannadaname": user.usernamekan,
          "id": user.id,
        }

        // this.http.post<any>(`${Urls.ALLS}`, {
        //   email: user.email,
        //   mobile: user.mobile,
        //   boloodgroup: user.bloodgroup,
        //   userid: user.id,
        //   age: user.age,
        //   gender: user.gender,
        //   username: user.username,
        //   usernamekan: user.usernamekan,
        //   centers: user.centers,
        //   role: user.role,
        //   centerId: centerId
        // }).pipe(map(users => {
        //   console.log(users)
        //   this.regus = users;
        //   for (let c = 0; c < user.centers.length; c++) {
        //     this.http.get(`${Urls.CENTERS}/${user.centers[c]}`).subscribe(res => {
        //       this.oldCv = res;
        //       userName["allId"] = users.id
        //       console.log("REG USER" + this.regus, " REG DATA " + this.regdat)
        //       this.oldCv.userName.push(userName);
        //       delete this.oldCv.id;
        //       this.http.patch(`${Urls.CENTERS}/${user.centers[c]}`, this.oldCv).subscribe(res => {
        //         console.log("user inserted into center", res)
        //         this.router.navigate(['/login']);
        //       })
        //     })
        //   }
        // })).subscribe(datas => {
        //   this.regdat = datas;
        //   console.log(datas);
        // });
        // for (let c = 0; c < user.centers.length; c++) {
        //   this.http.get(`${Urls.CENTERS}/${user.centers[c]}`).subscribe(res => {
        //     this.oldCv = res;
        //     // userName.allId = 
        //     console.log("REG USER" + this.regus, " REG DATA " + this.regdat)
        //     this.oldCv.userName.push(userName);
        //     delete this.oldCv.id;
        //     this.http.patch(`${Urls.CENTERS}/${user.centers[c]}`, this.oldCv).subscribe(res => {
        //       console.log("user inserted into center", res)
        //       this.router.navigate(['/login']);
        //     })
        //   })
        // }
      }));
  }
}
