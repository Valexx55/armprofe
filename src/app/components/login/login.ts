import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private authService = inject(AuthenticationService);
  private router = inject(Router);
  private activateRoute = inject(ActivatedRoute);

  login ():void{
    this.authService.login();

    //:? oeprador elvis KOTLIN
    //vamos a hacer una redirección
    //null-coalescing operator /:KOLESCING/
    //SI EL parámetro es nullo, que ruta destino sea '/'
    let rutaDestino = this.activateRoute.snapshot.queryParamMap.get('redirectTo') ?? '/';

    //! non null operator - un valor que puede ser null "le juro al compilador que no es"
    //this.router.navigateByUrl(rutaDestino!);
    this.router.navigateByUrl(rutaDestino!);
  }

  logout (): void {
    this.authService.logout();

  }
  

}
