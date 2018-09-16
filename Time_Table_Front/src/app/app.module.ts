import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BsDatepickerModule} from 'ngx-bootstrap';
import {AppComponent} from './app.component';
import {AppheaderComponent} from './components/appheader/appheader.component';
import {AppfooterComponent} from './components/appfooter/appfooter.component';
import {AppmenuComponent} from './components/appmenu/appmenu.component';
import {AppsettingComponent} from './components/appsetting/appsetting.component';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './components/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Http, HttpModule} from '@angular/http';
import {UserComponent} from './components/user/user.component';
import {AdminComponent} from './components/admin/admin.component';
import {TOKEN_NAME} from './services/auth.constant';
import {AuthConfig, AuthHttp} from 'angular2-jwt';
import {AuthGuard} from './services/guards/auth-guard.service';
import {AdminAuthGuard} from './services/guards/admin-auth-guard.service';
import {AppDataService} from './services/app-data.service';
import {AuthenticationService} from './services/authentication.service';
import {CalendarComponent} from './components/calendar/calendar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'angular-calendar';
import {CommonModule} from '@angular/common';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import {FlatpickrModule} from 'angularx-flatpickr';
import {SeanceService} from './services/seance.service';
import {ClasseComponent} from './components/classe/classe.component';
import {ClasseService} from './services/classe.service';
import {SalleComponent} from './components/salle/salle.component';
import {SalleService} from './services/salle.service';
import { MatiereComponent } from './components/matiere/matiere.component';
import {MatiereService} from './services/matiere.service';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {SignupComponent} from './components/signup/signup.component';
import {AlertService} from "./services/alert.service";
import {DisponibiliteService} from './services/disponibilite.service';


export function authHttpServiceFactory(http: Http) {
    return new AuthHttp(new AuthConfig({
        headerPrefix: 'Bearer',
        tokenName: TOKEN_NAME,
        globalHeaders: [{'Content-Type': 'application/json'}],
        noJwtError: false,
        noTokenScheme: true,
        tokenGetter: (() => localStorage.getItem(TOKEN_NAME))
    }), http);
}

@NgModule({
    declarations: [
        AppComponent,
        AppheaderComponent,
        AppfooterComponent,
        AppmenuComponent,
        AppsettingComponent,
        HomeComponent,
        LoginComponent,
        UserComponent,
        AdminComponent,
        CalendarComponent,
        ClasseComponent,
        SalleComponent,
        SignupComponent,
        MatiereComponent,

    ],
    imports: [
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot(),
        NgbModalModule.forRoot(),
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot(),
        BsDatepickerModule.forRoot(),
        InputTextModule,
        DialogModule,
        ButtonModule,
        CalendarModule
    ],
    providers: [
        {
            provide: AuthHttp, useFactory: authHttpServiceFactory, deps: [Http]
        },
        UserService,
        AuthGuard,
        AdminAuthGuard,
        AppDataService,
        AuthenticationService,
        SeanceService,
        ClasseService,
        SalleService,
        AlertService,
        UserService,
        DisponibiliteService,
        MatiereService
    ],
    bootstrap: [AppComponent]
    
})
export class AppModule {
}
