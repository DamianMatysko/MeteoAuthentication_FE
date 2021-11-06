import {DashboardComponent} from './dashboard/dashboard.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginGuardGuard} from './guards/login-guard.guard';
import {StationsComponent} from './stations/stations.component';
import {RegisterStationComponent} from './register-station/register-station.component';
import {StationDetailComponent} from './station-detail/station-detail.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuardGuard]
  },
  {
    path: 'stations', component: StationsComponent, canActivate: [LoginGuardGuard]
  },
  {
    path: 'register-station', component: RegisterStationComponent, canActivate: [LoginGuardGuard]
  },
  {
    path: 'station-detail/:id', component: StationDetailComponent, canActivate: [LoginGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
