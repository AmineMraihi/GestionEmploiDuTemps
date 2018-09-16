import {Component, OnInit} from '@angular/core';
import {AppDataService} from '../../services/app-data.service';
import * as moment from 'moment';
import {Observable} from 'rxjs/Observable';
import {Seance} from '../../models/seance';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {Role} from '../../models/Role';
import {AlertService} from '../../services/alert.service';
import {Router} from '@angular/router';
import {Classe} from '../../models/classe';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


    constructor(private appDataService: AppDataService, private userservice: UserService,
                private router: Router,
                private alertService: AlertService) {
    }

    clickedBtn: Boolean = false;
    loading = false;
    user1: any = {};
    test: User = new User();

    public users;
    public roles;


    ngOnInit() {
        this.getUser();
        this.listrole();
    }

    updateuser(user) {
        let seanceToBeUpdated = new User();
        seanceToBeUpdated.id = user.id;
        seanceToBeUpdated.firstName = user.firstName;
        seanceToBeUpdated.lastName = user.lastName;
        seanceToBeUpdated.username = user.username;
        seanceToBeUpdated.email = user.email;


        seanceToBeUpdated.password = user.password;
        seanceToBeUpdated.roles_id = user.roles_id;

        this.userservice.updateUser(seanceToBeUpdated).subscribe(
            data => {

                return true;
            }, error1 => {
                return Observable.throw(error1);
            },
            () => console.log('user ' + user.username + ' updated')
        );
    }

    deleteuser(user) {
        this.userservice.deleteUser(user.id).subscribe(
            data => {
                this.getUser();
            }, error1 => {
                return Observable.throw(error1);
            },
            () => console.log('user ' + user.username + ' deleted')
        );
    }

    getUser() {
        this.users = [];
        this.userservice.getuser1().subscribe(
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
                        this.users.push(x);
                }
            },
            error1 => Observable.throw(error1),
            () => console.log('user loaded')
        );
    }

    getRole1() {

        this.userservice.getRole().subscribe(
            data => {
                console.log(data === JSON.parse(JSON.stringify(data)));
                for (let role of JSON.parse(JSON.stringify(data))) {
                    var x = new Role();
                    x.roleName = role.roleName;

                    this.roles.push(x);
                }
            }
        );

    }

    testClicked() {
        this.clickedBtn = !this.clickedBtn;
    }

    register() {
        this.loading = true;
        this.userservice.create(this.user1)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    listrole() {

        this.userservice.getRole().subscribe(
            data => {
                this.roles = data;
                console.log(this.roles);
            }
        );

    }


    verifierUserName(): Boolean {
        this.userservice.usernameExist(this.user1.username).subscribe(
            data => {
                if (data instanceof User) {
                    this.test = data;
                }
            }
        );
        console.log(this.test);
        if (this.test === null) {
            return false;
        } else {
            return true;
        }
    }
}
