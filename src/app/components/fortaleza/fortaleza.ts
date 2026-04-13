import { Component, computed, signal } from '@angular/core';


type UsuarioCreado = {
  nombre: string;
  password: string;
  fortaleza: string;
};


@Component({
  selector: 'app-fortaleza',
  imports: [],
  templateUrl: './fortaleza.html',
  styleUrl: './fortaleza.css',
})
export class Fortaleza {

  fuerte:boolean = false;
  titulo: string = 'ALTA DE USUARIO';

  /**
   *
   *SIGNLAS BASE DEL COMPONENTE
   REPRESENTAR EL ESTADO INTRODUCIDO POR EL USUARIO
   *
   */
  nombre = signal('');
  password = signal('');

  /*
  cuando el nombre y la contraseña cambien
  vamos a reevaluar su ideneoidad de manera automática
  eso lo conseguimos con computed
  gracias a computed, reaccion automáticamente
  a los cambios de los signals
  dato derivado, calculado 
  */

  tieneMinimoCaracteres = computed(() => this.password().length >= 8);

  //esto no funcionaría porque no está envuelto por computed
  //al inicio valdría false, pero no se cambiaría cuando cambie el
  //valor del password
  //tieneMinimoCaracteres2 = this.password().length >= 8;

  /**
   * Computed: indica si la contraseña contiene al menos una mayúscula.
   */
  tieneMayuscula = computed(() => /[A-ZÁÉÍÓÚÜÑ]/.test(this.password()));

  /**
   * Computed: indica si la contraseña contiene al menos un número.
   */
  tieneNumero = computed(() => /\d/.test(this.password()));

  /**
   * Computed: indica si la contraseña contiene al menos un símbolo.
   */
  tieneSimbolo = computed(() => /[^A-Za-z0-9]/.test(this.password()));

  puntuacionPassword = computed(() => {
    let puntos = 0;

    if (this.tieneMinimoCaracteres()) puntos++;
    if (this.tieneMayuscula()) puntos++;
    if (this.tieneNumero()) puntos++;
    if (this.tieneSimbolo()) puntos++;

    return puntos;
  });

  fortalezaTexto = computed(() => {
    let texto = '';
    let pwd = this.password().trim();
    let puntos = this.puntuacionPassword();

    if (!pwd) {
      texto = '';
    } else {
      if (puntos <= 1) {
        texto = 'Débil';
      } else if (puntos <= 3) {
        texto = 'Media';
      } else if (puntos > 3) {
        texto = 'Fuerte';
      }
    }
    return texto;
  });

  fortalezaClase = computed(() => {
    let estilo = '';
    let pwd = this.password().trim();
    let puntos = this.puntuacionPassword();

    if (!pwd) {
      estilo = '';
    } else {
      if (puntos <= 1) {
        estilo = 'badge bg-danger';
      } else if (puntos <= 3) {
        estilo = 'badge bg-warning text-dark';
      } else if (puntos > 3) {
        estilo = 'badge bg-success';
      }
    }
    return estilo;
  });

  barraFortalezaClase = computed(() => {
    let colorBarra = '';
    let pwd = this.password().trim();
    let puntos = this.puntuacionPassword();

    if (!pwd) {
      colorBarra = 'progress-bar';
    } else {
      if (puntos <= 1) {
        colorBarra = 'progress-bar bg-danger';
      } else if (puntos <= 3) {
        colorBarra = 'progress-bar bg-warning';
      } else if (puntos > 3) {
        colorBarra = 'progress-bar bg-success';
      }
    }
    return colorBarra;
  });

  barraFortalezaValor = computed(() => {
    let porcentaje = 0;
    let pwd = this.password().trim();

    if (pwd) {
      porcentaje = this.puntuacionPassword() * 25;
    }
    return porcentaje;
  });

  passwordValida = computed(() => this.puntuacionPassword() >= 3);

  puedeCrear = computed(() => {
    return this.nombre().trim().length > 0 && this.passwordValida();
  });

  onNombreInput (event: Event):void {
    //event.target es el elemento web donde ocurrió el evento (un div, un a, un input)
    let valorNombre = (event.target as HTMLInputElement).value; 
    this.nombre.set(valorNombre);

  }

  onPasswordInput (event: Event):void {
    //event.target es el elemento web donde ocurrió el evento (un div, un a, un input)
    let valorPassword = (event.target as HTMLInputElement).value; 
    this.password.set(valorPassword);
    
  }

  crearUsuario():void {
    if (this.puedeCrear())//tenemos los datos del usuario
    {
      let nuevoUsuario: UsuarioCreado = {
      nombre: this.nombre().trim(),
      password: this.password(),
      fortaleza: this.fortalezaTexto(),
    };
    }
  }

}
