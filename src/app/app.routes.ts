import { Routes } from '@angular/router';
import { Shell } from '@core/layout/shell/shell';
import { Dashboard } from '@features/dashboard/dashboard';
import { Login } from '@features/login/login';

export const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: Login },
  {
    path: '',
    component: Shell,
    children: [{ path: 'dashboard', component: Dashboard }],
  },
];
