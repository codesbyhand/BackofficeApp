import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RippleDirective } from '@shared/ripple';
@Component({
  imports: [RouterLink, RippleDirective],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {}
