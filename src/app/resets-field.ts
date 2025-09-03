import {
  ChangeDetectionStrategy,
  Component,
  linkedSignal,
  Signal,
  signal,
} from '@angular/core';
import { Control, form } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/**
 * @deprecated Ask around about why the values of the form do not propogate up to the source signals
 */
@Component({
  selector: 'app-resets-field',
  imports: [Control, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <form>
      <mat-form-field>
        <mat-label for="item-select">Item:</mat-label>
        <mat-select [control]="myForm.selectedItem">
          @for (item of itemOptions; track $index) {
            <mat-option [value]="item">{{ item }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label for="quantity-select">Choose # to order:</mat-label>
        <mat-select [control]="myForm.quantity">
          @for (num of [1, 2, 3]; track $index) {
            <mat-option [value]="num">{{ num }}</mat-option>
          }
        </mat-select>
      </mat-form-field>
    </form>

    {{ selectedItem() }} x {{ quantity() }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetsField {
  itemOptions = ['Phone', 'Laptop'];
  selectedItem = signal(['Phone']);
  quantity = linkedSignal({
    source: this.selectedItem,
    computation: () => 1,
  });

  ls = linkedSignal(() => ({
    selectedItem: this.selectedItem(),
    quantity: this.quantity(),
  }));

  myForm = form(this.ls);
}
