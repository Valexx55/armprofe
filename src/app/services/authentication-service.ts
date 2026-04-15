import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  autenticado = signal(false);

  login():void {
    this.autenticado.set(true);
    console.log('login autenticado');
  }

  logout():void {
    this.autenticado.set(false);
    console.log('login no autenticado');
  }
  
  cambioLog():void{
    this.autenticado.update(valor=>!valor);
    console.log(`login autenticado = ${this.autenticado()}`);
  }
}
