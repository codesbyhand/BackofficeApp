import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostBinding,
  inject,
  Input,
} from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { SelectModal } from './select-modal/select-modal';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from './select-custom.interface';

@Component({
  selector: 'app-select-custom',
  imports: [],
  templateUrl: './select-custom.html',
  styleUrl: './select-custom.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCustom),
      multi: true,
    },
  ],
})
export class SelectCustom implements ControlValueAccessor {
  readonly dialog = inject(Dialog);
  readonly cdr = inject(ChangeDetectorRef);

  @HostBinding('class')
  @Input()
  class: string = '';
  @Input() items: Item[] = [];

  value: any;
  valueName: any = '';

  private onChange: (_: any) => void = () => {};

  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelectChange(value: any) {
    this.value = value;
    this.onChange(value);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<{ type: string; item: any }>(SelectModal, {
      width: '500px',
      data: { type: 'checkbox', item: this.items },
      disableClose: true,
      autoFocus: false,
      backdropClass: 'crt-backdrop',
      panelClass: 'crt-select-pane',
    });

    dialogRef.closed.subscribe((result: any) => {
      if (result?.type === 'checkbox') {
        const checkedItems = result.item.filter((v: Item) => v.checked);
        this.valueName = checkedItems.map((v: Item) => v.name);
        this.value = checkedItems.map((v: Item) => v.value) || [];
        this.onChange(this.value);
        this.cdr.detectChanges();
      }
    });
  }
}
