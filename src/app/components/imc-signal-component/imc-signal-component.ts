import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';



type ImcFormControls = {
  peso: FormControl<number>;
  altura: FormControl<number>;
};

type ImcResultado = {
  
}
@Component({
  selector: 'app-imc-signal-component',
  imports: [ReactiveFormsModule],
  templateUrl: './imc-signal-component.html',
  styleUrl: './imc-signal-component.css',
  standalone: true
})
export class ImcSignalComponent {

   imcNumericoActual = signal(0);

   private fb = inject(NonNullableFormBuilder);

   imcForm: FormGroup<ImcFormControls> = this.fb.group(
    {
      peso: this.fb.control(0, {
        validators: [
          Validators.required,
          Validators.min(1),
          Validators.max(300),
        ],
        updateOn: 'submit'
      }),

      altura: this.fb.control(0, {
        validators: [
          Validators.required,
          Validators.min(0.5),
          Validators.max(2.50),
        ],
        updateOn: 'submit'
      })

    }
  );

  calcularImc()
  {
    if (this.imcForm.valid)
    {
      console.log('Formulario válido');
      let imc = this.imcForm.controls.peso.value / (this.imcForm.controls.altura.value * this.imcForm.controls.altura.value); 
      console.log('Imc calculado = ' + imc);
      this.imcNumericoActual.set(imc);
    }
  }

  resutaldoImc = computed(()=> {

  })
}
