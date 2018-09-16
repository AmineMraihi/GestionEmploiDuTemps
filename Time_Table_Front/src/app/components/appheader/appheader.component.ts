import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

    currentUser = new User();

    constructor(public authenticationservice: AuthenticationService, public router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

    logOut() {
        this.authenticationservice.logOut()
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {

                });
    }
}
