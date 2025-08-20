import { JsonPipe } from '@angular/common';
import { Component, computed, resource, signal, Signal } from '@angular/core';

interface User {
  id: string;
  name: string;
  email: string;
}
function fetchUser(userId: string): Promise<User> {
  return new Promise((resolve) => {
    const mockUser: User = {
      id: userId,
      name: `Mock User ${userId}`,
      email: `user${userId}@example.com`,
    };
    resolve(mockUser);
  });
}

@Component({
  selector: 'app-resource',
  imports: [JsonPipe],
  template: ` <p>resource works!</p> `,
  styles: `
    <pre>{{ userResource() | json }}</pre>
  `,
})
export class Resource {
  userId: Signal<string> = signal('1');
  userResource = resource({
    params: () => ({ id: this.userId() }),

    loader: ({ params }) => fetchUser(params.id),
  });

  name = computed(() => {
    if (this.userResource.hasValue()) {
      return this.userResource.value().name;
    }
    return undefined;
  });
}
