import { Component, signal } from '@angular/core';
@Component({
  imports: [],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
  host: {
    class: 'transition-[width] duration-400',
    '[class.w-60]': 'isOpen()',
    '[class.w-14]': '!isOpen()',
  },
})
export class Sidebar {
  protected readonly isOpen = signal(false);
}
