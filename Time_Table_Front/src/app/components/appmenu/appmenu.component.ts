import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
    selector: 'app-appmenu',
    templateUrl: './appmenu.component.html',
    styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {


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
