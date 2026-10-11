import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Item } from '@shared/components/select-custom/select-custom.interface';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { CdkTableModule } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/collections';
import { minSelectedItems } from '@shared/utils/validators/minimum-selected-items';
import { SelectCustom } from '@shared/components/select-custom/select-custom';
import { TableCustom, TableColumn } from '@shared/components/table-custom/table-custom';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
const COLUMNS: TableColumn<PeriodicElement>[] = [
  { key: 'position', name: 'No.' },
  { key: 'name', name: 'Name' },
  { key: 'weight', name: 'Weight' },
  { key: 'symbol', name: 'Symbol' },
];
@Component({
  imports: [SelectCustom, FormsModule, ReactiveFormsModule, CdkTableModule, TableCustom],
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
  dataSource = new ExampleDataSource().data.value;
  columns = COLUMNS;

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
/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<PeriodicElement> {
  /** Stream of data that is provided to the table. */
  data = new BehaviorSubject<PeriodicElement[]>(ELEMENT_DATA);

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PeriodicElement[]> {
    return this.data;
  }

  disconnect() {}
}
