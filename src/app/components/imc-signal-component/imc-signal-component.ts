import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';



type ImcFormControls = {
  peso: FormControl<number>;
  altura: FormControl<number>;
};

@Component({
  selector: 'app-imc-signal-component',
  imports: [ReactiveFormsModule],
  templateUrl: './imc-signal-component.html',
  styleUrl: './imc-signal-component.css',
  standalone: true
})
export class ImcSignalComponent {

   private fb = inject(NonNullableFormBuilder);

   imcForm: FormGroup<ImcFormControls> = this.fb.group(
    {
      peso: this.fb.control(0, {
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(300),
        ],
      }),

      altura: this.fb.control(0, {
        validators: [
          Validators.required,
          Validators.min(0.5),
          Validators.max(2.50),
        ],
      })

    }
  );

  calcularImc()
  {

  }
}
