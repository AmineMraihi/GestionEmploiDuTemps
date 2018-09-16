import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
import * as moment from 'moment';
import {Role} from '../../models/Role';
import {Observable} from 'rxjs/Observable';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    user: User = new User();
    public roles;
    public users;

    public role ;

    usernameexist = false;

    loading = false;


    ngOnInit() {
        this.getUser();
        this.fillRole();
        this.role = new Role();
    }

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
    }

    register() {
        this.loading = true;
        console.log(this.role);

        console.log(this.user);

        this.userService.create(this.user)
            .subscribe(
                data => {

                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    listrole() {

        this.userService.getRole().subscribe(
            data => {
                this.roles = data;
                console.log(this.roles);
            }
        );

    }

    getUser() {
        this.users = [];
        this.userService.getuser1().subscribe(
            data => {
                console.log(data === JSON.parse(JSON.stringify(data)));
                for (let user of JSON.parse(JSON.stringify(data))) {
                    var x = new User();
                    x.id = user.id;
                    x.firstName = user.firstName;

                    x.lastName = user.lastName;
                    x.email = user.email,
                        x.username = user.username,
                        x.password = user.password,
                        x.roles_id= user.roles_id,
                        this.users.push(x);
                }
            },
            error1 => Observable.throw(error1),
            () => console.log('user loaded')
        );
    }

    userexist(username: String) {
        this.usernameexist = false;
        this.userService.usernameExist(username).subscribe(data => {
                this.usernameexist = true;
            },
            error => {
                this.loading = false;
            });

    }
    updateRole(role){
        this.role=role;
        console.log(this.role);

    }

    fillRole() {
        this.userService.getRole().subscribe(
            data => {
                this.roles = data;
                console.log(this.roles);
            }
        );

    }
}



