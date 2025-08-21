import { Component, model } from '@angular/core';
import { Product } from './shared';
import { Control, form } from '../../experimental';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-child',
  template: `
    <mat-form-field>
      <mat-label>Name</mat-label>
      <input matInput [control]="productForm.name" />
    </mat-form-field>

    <mat-form-field>
      <mat-label>Price</mat-label>
      <input matInput [control]="productForm.price" type="number" />
    </mat-form-field>

    <mat-form-field>
      <mat-label>Description</mat-label>
      <input matInput [control]="productForm.description" />
    </mat-form-field>

    <pre>value: {{ productForm().value() | json }}</pre>
  `,
  imports: [Control, MatFormFieldModule, MatInputModule, JsonPipe],
})
export class Child {
  product = model.required<Product>();

  productForm = form(this.product);
}
