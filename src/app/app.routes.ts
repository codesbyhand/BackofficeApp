import { Routes } from '@angular/router';
import { MainShell } from '@core/layout/main-shell/main-shell';
import { Dashboard } from '@features/dashboard/dashboard';
import { Login } from '@features/login/login';
import { AuthShell } from '@core/layout/auth-shell/auth-shell';

export const routes: Routes = [
  {
    path: '',
    component: AuthShell,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
    ],
  },
  {
    path: 'app',
    component: MainShell,
    children: [{ path: 'dashboard', component: Dashboard }],
  },
  { path: '**', redirectTo: '' },
];
