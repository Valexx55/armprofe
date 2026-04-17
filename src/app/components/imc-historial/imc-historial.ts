import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ImcResultado } from '../../models/imc-resultado';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-imc-historial',
  imports: [DecimalPipe],//PARA mostrar decimales formateados
  templateUrl: './imc-historial.html',
  styleUrl: './imc-historial.css',
  changeDetection: ChangeDetectionStrategy.OnPush
  //con este valor, si no le paso un array nuevo (nueva dirección de memoria
  //el componente no se repinta)
  //le digo a ANgular que revise el estado de este componente sólo cuando cambie una referencia del input
})
export class ImcHistorial {

  //@Input() historial!: Imc[]; antiguamente
  //ahora con historial, tengo effects, computeds
  //input.required<T>() es la API moderna para declarar un input obligatorio y consumirlo como signal.
  //historial = input<Imc[]>(); opcional
  //historial = input<Imc[]>([]); opcional con valor incial
  //historial = input<ImcResultado[]>();
  historial = input<ImcResultado[]>([]);
  mediaPeso = input<number>(0);
  mediaAltura = input<number>(0);


  getColorCategoria (categoria:string) :string
  {
    let estilo = '';

    switch (categoria)
    {
      case 'DESNUTRIDO':
      case 'OBESO':
          estilo = "badge bg-danger";
        break;

      case 'SOBREPESO':
      case 'DELGADO':
          estilo = "badge bg-warning";
        break;
      default:
          estilo = "badge bg-success";

    }

    return estilo;
  }

}
