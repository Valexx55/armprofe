import { Component, computed, effect, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImcHistorial } from '../imc-historial/imc-historial';
import { ImcResultado } from '../../models/imc-resultado';

type ImcFormControls = {
  peso: FormControl<number>;
  altura: FormControl<number>;
};

/*type ImcResultado = {
  peso: number;
  altura: number;
  numerico: number;
  categoria: string;
  foto: string;
};*/
@Component({
  selector: 'app-imc-signal-component',
  imports: [ReactiveFormsModule, ImcHistorial],
  templateUrl: './imc-signal-component.html',
  styleUrl: './imc-signal-component.css',
  standalone: true,
})
export class ImcSignalComponent {
  static readonly FOTO_DESNUTRIDO: string = '/desnutrido.jpg';
  static readonly FOTO_DELGADO: string = '/delgado.jpg';
  static readonly FOTO_IDEAL: string = '/ideal.jpg';
  static readonly FOTO_SOBREPESO: string = '/sobrepeso.jpg';
  static readonly FOTO_OBESO: string = '/obeso.jpg';

  
  lista_imcs = signal<ImcResultado[]>([]);
  imcNumericoActual = signal<number | null>(null);


  private fb = inject(NonNullableFormBuilder);
  imcForm: FormGroup<ImcFormControls> = this.fb.group({
    peso: this.fb.control(0, {
      validators: [Validators.required, Validators.min(1), Validators.max(300)],
      updateOn: 'submit',//no se evalúa si es valido, hasta que no le da a enviar
    }),

    altura: this.fb.control(0, {
      validators: [Validators.required, Validators.min(0.5), Validators.max(2.5)],
      updateOn: 'submit',
    }),
  });

  //CICLO REACTIVO FORMULARIO + SIGNALS

//CLICK CALCULAR 
//    --> FORMULARIO VÁLIDO 
//          --> NUEVO VALOR IMC(SIGNAL) 
//             -->  resutaldoImc (COMPUTED) nuevo IMCResultado 
//                --> add a la lista (EFFECT) modficamos signal lista_imcs
//                   --> actualizamos Peso y Altura medias (COMPUTED) 

   constructor()
  {
   effect(() => {
    //al calcular un nuevo registro de IMCs
    const nuevoResultado = this.resutaldoImc();
    //añadimos a la lista
    if (nuevoResultado !== null) {
      //si paso una nueva referncia (nuevo array, sí se actuzlia, si no, no)
      this.lista_imcs.update(listaActual => [nuevoResultado, ...listaActual]);
      //en este caso, modifico el array, pero no creo una nueva referencia, por lo que
      //el componente hijo no se actuliza porque está con OnPush y pasando la misma referencia
      //this.lista_imcs().push(nuevoResultado);// (listaActual => [nuevoResultado, ...listaActual]);
    }
    //al modificar la lista, vamos a recalcular la mediaPeso y la mediaAltura
  });

  
  }


   calcularImc() {
    if (this.imcForm.valid) {
      console.log('Formulario válido');
      let imc =
        this.imcForm.controls.peso.value /
        (this.imcForm.controls.altura.value * this.imcForm.controls.altura.value);
      console.log('Imc calculado = ' + imc);
      this.imcNumericoActual.set(imc); //si es el mismo valor no cambia el estado, no hay reacción
    }
  }

  

 
 


  resutaldoImc = computed<ImcResultado | null>(() => {
    let categoriaResultado: string = '';
    let fotoResultado: string = '';

    let imcResultado: ImcResultado | null = null;

    if (this.imcNumericoActual()) {
      //this.oimc.numerico = parseFloat(this.oimc.numerico.toFixed(2));
      if (this.imcNumericoActual()!< 16) {
        //desnutrido
        categoriaResultado = 'DESNUTRIDO';
        fotoResultado = ImcSignalComponent.FOTO_DESNUTRIDO;
      } else if (this.imcNumericoActual()! >= 16 && this.imcNumericoActual()! < 18) {
        //delgado
        categoriaResultado = 'DELGADO';
        fotoResultado = ImcSignalComponent.FOTO_DELGADO;
      } else if (this.imcNumericoActual()! >= 18 && this.imcNumericoActual()! < 25) {
        //ideal
        categoriaResultado = 'IDEAL';
        fotoResultado = ImcSignalComponent.FOTO_IDEAL;
      } else if (this.imcNumericoActual()! >= 25 && this.imcNumericoActual()! < 31) {
        //soberpeso
        categoriaResultado = 'SOBREPESO';
        fotoResultado = ImcSignalComponent.FOTO_SOBREPESO;
      } else if (this.imcNumericoActual()! >= 31) {
        //obeso
        categoriaResultado = 'OBESO';
        fotoResultado = ImcSignalComponent.FOTO_OBESO;
      }

      imcResultado = {
        peso: this.imcForm.controls.peso.value,
        altura: this.imcForm.controls.altura.value,
        numerico: Number(this.imcNumericoActual()?.toFixed(2)),
        categoria: categoriaResultado,
        foto: fotoResultado,
      };
    }

    return imcResultado;
  });


   mediaPeso = computed(() => {
  const listaActual = this.lista_imcs();

  if (listaActual.length === 0) {
    return 0;
  } else {
    return this.obtenerMediaPeso(listaActual);
  }
});

mediaAltura = computed(() => {
  const listaActual = this.lista_imcs();

  if (listaActual.length === 0) {
    return 0;
  } else {
    return this.obtenerMediaAltura(listaActual);
  }
});


 
  
  obtenerMediaAltura(array_imcs: Array<ImcResultado>): number {

    let total = 0;

    array_imcs.forEach((item_imc) => {
      total += item_imc.altura;
    });

    return total / array_imcs.length;
  }

  obtenerMediaPeso(array_imcs: Array<ImcResultado>): number {

    let total = 0;

    array_imcs.forEach((item_imc) => {
      total += item_imc.peso;
    });

    return total / array_imcs.length;
  }

  

}
