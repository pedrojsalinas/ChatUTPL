import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DocenteService } from "../services/docente.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private docenteService: DocenteService, private router: Router) { }

  canActivate(): boolean {
    if (!this.docenteService.haIniciadoSesion()) {
      this.router.navigateByUrl('/');
      this.docenteService.cerrarSesionDocente();
      return false;
    }else{
      return true;
    }
  }
}
