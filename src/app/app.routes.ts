import { LoggedInGuard } from './core';
import { HomeComponent } from './home-component';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from './core/constants';

const routes: Routes = [
  { path: Constants.Routes.Home, component: HomeComponent }
];

export const routing = RouterModule.forRoot(routes);
