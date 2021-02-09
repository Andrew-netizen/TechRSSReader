import { FormArray } from "@angular/forms";

export class FormArrayValidator {

  constructor(private formArrayName: string, private validationMessages: {[key: string]: {[key: string]: string}})
  {

  }

  processMessages(container: FormArray): string[] {
    const messages = Array<string>(container.length);
    for (let controlIndex = 0; controlIndex < container.controls.length; controlIndex++)
    {
      const control = container.controls[controlIndex];
      if (this.validationMessages[this.formArrayName]) {
        messages[controlIndex] = '';
        if ((control.dirty || control.touched) && (control.errors))
        {
          Object.keys(control.errors).map(messageKey => {
            if (this.validationMessages[this.formArrayName][messageKey]) {
              messages[controlIndex] += this.validationMessages[this.formArrayName][messageKey] + ' ';
            }
          });
        }
      }
    }
    return messages;
  }
}
