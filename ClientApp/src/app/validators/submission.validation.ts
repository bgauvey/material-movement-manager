import { ValidatorFn, FormGroup } from '@angular/forms';

export function ValidateReason() {
  return (formGroup: FormGroup) => {
    const reason = formGroup.get('reason');
    const dest = formGroup.get('dest');

    // set error on dest if validation fails
    if (reason.value === 3) {
      // 1036
      if (dest.value === 707) {
        dest.setErrors(null);
      } else {
        dest.setErrors({ cutback: true });
      }
    }

    // Rework
    if (reason.value === 2) {
      // 1020
      if (dest.value === 701) {
        dest.setErrors(null);
      } else {
        dest.setErrors({ rework: true });
      }
    }
  };
}
