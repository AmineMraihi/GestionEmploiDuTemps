import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AppheaderComponent} from './components/appheader/appheader.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {UserComponent} from './components/user/user.component';
import {AdminComponent} from './components/admin/admin.component';
import {AuthGuard} from './services/guards/auth-guard.service';
import {ClasseComponent} from './components/classe/classe.component';
import {AdminAuthGuard} from './services/guards/admin-auth-guard.service';
import {SalleComponent} from './components/salle/salle.component';
import {SignupComponent} from "./components/signup/signup.component";
import {MatiereComponent} from './components/matiere/matiere.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'classes',
        component: ClasseComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'salles',
        component: SalleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: UserComponent
    },

    {
        path: 'matieres',
        component: MatiereComponent,
        canActivate: [AuthGuard]
    },



]
;

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
