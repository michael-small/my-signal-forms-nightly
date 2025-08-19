import { AbstractControl, Validators } from "@angular/forms";

export function requiredIfValidator(predicate: () => boolean) {
  return (formControl: AbstractControl<any, any, any>) => {
    if (!formControl.parent) {
      return null;
    }
    if (predicate()) {
      return Validators.required(formControl);
    }
    return null;
  };
}