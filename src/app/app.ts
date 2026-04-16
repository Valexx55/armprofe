import { AuthenticationService } from './services/authentication-service';
import { NgOptimizedImage } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('armprofe');
  authServ =  inject(AuthenticationService);

   login () {
    this.authServ.login();
    console.log('entrando login . . .');
    
  }

  logout ()
  {
    this.authServ.login();

    console.log('entrando saliendo . . .');
    
  }

  cambioAuth() {
    this.authServ.cambioLog();
  }

}
