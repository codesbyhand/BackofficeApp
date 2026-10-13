import { Component } from '@angular/core';
import { Login } from '@features/login/login';

@Component({
  imports: [Login],
  selector: 'app-auth-shell',
  styleUrl: './auth-shell.css',
  template: `<app-login />`,
})
export class AuthShell {}
