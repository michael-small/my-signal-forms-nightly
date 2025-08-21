import { Component, signal } from '@angular/core';
import { Product } from './shared';
import { Child } from './child';

@Component({
  selector: 'app-parent',
  template: ` <app-child [product]="product()" /> `,
  imports: [Child],
})
export class Parent {
  product = signal<Product>({
    id: '',
    name: '',
    price: 0,
    description: '',
  });
}
