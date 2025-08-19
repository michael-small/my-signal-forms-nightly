import { Component, effect, resource, signal } from '@angular/core';
import { form, SchemaOrSchemaFn, validateAsync } from '../experimental';
import { ValidationError } from '../experimental/src/api/validation_errors';

interface Cat {
    name: string;
}

@Component({
    selector: 'app-validate-async-issue',
    template: `
    `,
})
export class ValidateAsyncIssue {
    schema: SchemaOrSchemaFn<Cat[]> = function (p) {
        validateAsync(p, {
            params: ({ value }) => value(),
            factory: (params) =>
                resource({
                    params,
                    loader: async ({ params }) => {
                        return params as Cat[];
                    },
                }),
            errors: (cats, { fieldOf }) => {
                return cats.map((cat, index) =>
                    ValidationError.custom({
                        kind: 'meows_too_much1',
                        name: cat.name,
                        field: fieldOf(p)[index],
                    })
                );
            },
        });
    };

    cats = signal([{ name: 'Fluffy' }, { name: 'Ziggy' }]);
    form = form(this.cats, this.schema);

    constructor() {
        effect(() => {
            const form = this.form;

            console.log(form[0]().errors())
        })
    }
}

// await appRef.whenStable();
// expect(f[0]().errors()).toEqual([
//   ValidationError.custom({kind: 'meows_too_much', name: 'Fluffy'}),
// ]);
// expect(f[1]().errors()).toEqual([
//   ValidationError.custom({kind: 'meows_too_much', name: 'Ziggy'}),
// ]);
