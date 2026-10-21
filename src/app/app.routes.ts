
import { Routes } from '@angular/router';
import { Home } from '../Features/home/home';
import { Register } from '../Features/account/register';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: Register
  }
];
