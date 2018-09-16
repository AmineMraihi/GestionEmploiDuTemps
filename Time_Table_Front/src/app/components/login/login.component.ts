import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {User} from '../../models/user';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  errorMessage: string;
  user = new User();
  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) {
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];

  }

    ngOnInit(): void {
        this.userService.logout();

    }

  // processForm() {
  //   // if (this._userService.getUserUsernamePassword(this.user.username, this.user.password) != undefined) {
  //   //   this.router.navigate(['/home']);
  //   // }
  //   this._userService.getUserUsernamePassword(this.user.username, this.user.password).subscribe(
  //     (user) => {
  //       console.log(user);
  //       if (user != null) {
  //         this.router.navigate(['/home']);
  //       }
  //     }
  //   );
  // }

  login() {
    this.loading = true;

        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                result => {
                    this.loading = false;
                    if (result) {
                        this.userService.login(result);
                        // this.navigateAfterSuccess();


                        this.router.navigateByUrl('/home');
                    } else {
                        this.error = 'Username or password is incorrect';
                        console.log('Username or password is incorrect');
                    }
                },
                error => {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                    console.log('Username or password is incorrect');
                }
            );
    }

  private navigateAfterSuccess() {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigate(['/']);
    }
  }


}
