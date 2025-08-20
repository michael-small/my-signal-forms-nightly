import { JsonPipe } from '@angular/common';
import { Component, linkedSignal, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-linked-signal',
  template: `
    <pre><code>{{ shippingOptions() | json }}</code></pre>
    <pre><code>{{ selectedOption() | json }}</code></pre>
  `,
  imports: [JsonPipe],
})
export class LinkedSignal {
  shippingOptions: Signal<{ name: string }[]> = signal([
    { name: 'Standard' },
    { name: 'Express' },
    { name: 'Overnight' },
  ]);
  selectedOption = linkedSignal(() => this.shippingOptions()[0]);
  changeShipping(index: number) {
    this.selectedOption.set(this.shippingOptions()[index]);
  }
}
