import { signal } from '@angular/core';
import { form, required } from '../experimental';

const nameForm = form(signal({ first: '', last: '' }), (name) => {
  required(name.first);
  error(
    name.last,
    ({ value }) => !/^[a-z]+$/i.test(value()),
    'Alphabet characters only'
  );
});
nameForm().valid(); // false
nameForm().value.set({ first: 'John', last: 'Doe' });
nameForm().valid(); // true
