import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@core/layout/header/header';
import { Sidebar } from '@core/layout/sidebar/sidebar';
@Component({
  imports: [RouterOutlet, Header, Sidebar],
  selector: 'app-shell',
  styleUrl: './shell.css',
  templateUrl: './shell.html',
})
export class Shell {}
