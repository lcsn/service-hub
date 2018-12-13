import { FormControl } from "@angular/forms";

export class CustomValidators {

    static validateExtension(control: FormControl): { [s: string]: boolean } {
        if (control.value && (control.value.toLowerCase().endsWith('.jpg')
            || control.value.toLowerCase().endsWith('.png'))) {
            return null;
        }
        return { 'forbiddenExtension': true };
    }

}
