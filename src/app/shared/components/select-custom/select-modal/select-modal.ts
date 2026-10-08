import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../select-custom.interface';

@Component({
  selector: 'app-select-modal',
  imports: [FormsModule],
  templateUrl: './select-modal.html',
  styleUrl: './select-modal.css',
})
export class SelectModal {
  readonly dialog = inject(DialogRef);

  data = inject<{ type: string; item: Item[] }>(DIALOG_DATA);

  onCancel() {
    this.dialog.close(null);
  }

  onSelect() {
    this.dialog.close(this.data);
  }
}
