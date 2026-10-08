import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RippleDirective } from '@shared/ripple';
@Component({
  imports: [RouterLink, RouterLinkActive, RippleDirective],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {}
