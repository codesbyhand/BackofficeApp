import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Item } from '@shared/components/select-custom/select-custom.interface';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { minSelectedItems } from '@shared/utils/validators/minimum-selected-items';
import { SelectCustom } from '@shared/components/select-custom/select-custom';

@Component({
  imports: [SelectCustom, FormsModule, ReactiveFormsModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  httpClient = inject(HttpClient);
  // Holds the dynamic item list fetched from an API
  itemList = signal<Item[]>([]);
  // Reactive form control with a custom validator
  employee = new FormControl([], [minSelectedItems(3)]);

  // Fetch user data on init and map to the Item structure
  async ngOnInit(): Promise<void> {
    const result = await firstValueFrom(
      this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/users').pipe(
        map((users) => {
          return users.map((user) => ({
            checked: false,
            value: user.id.toString(),
            name: user.name,
          }));
        }),
      ),
    );
    this.itemList.set(result);
  }

  // Debug method to view selected employees
  onCheck() {
    console.log('%c[🧪] this.itemModel : ', 'color: #28a745; font-weight: bold;', this.employee);
  }
}
