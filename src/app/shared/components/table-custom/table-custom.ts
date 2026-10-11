import { Component, input, computed } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';

export interface TableColumn<T> {
  key: keyof T & string;
  name: string;
}
@Component({
  imports: [CdkTableModule],
  selector: 'app-table-custom',
  styleUrl: './table-custom.css',
  templateUrl: './table-custom.html',
})
export class TableCustom<T> {
  readonly columns = input.required<TableColumn<T>[]>();
  readonly data = input.required<T[]>();

  columnKeys = computed(() => {
    return this.columns().map((c) => c.key);
  });
}
