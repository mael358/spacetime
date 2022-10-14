import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST_BACKEND } from '../config/config';
import { Usuario } from './usuario';

@Injectable({
    providedIn: 'root'
  })
export class LoginService {

    constructor(private httpClient: HttpClient) {}

    private _usuario: Usuario;

    //Obtiene el usuario del session storage
    public get usuario(): Usuario {

      if(this._usuario != null){
        return this._usuario;
      } else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
        var user = sessionStorage.getItem('usuario');
        if (user != null)
        {
          this._usuario = JSON.parse(user);
          return this._usuario;
        }
      }
      return undefined;
    }

    yaInicioSesion(): boolean {
      let usuario = this.usuario;
      if (usuario != undefined && usuario.nombres && usuario.nombres.length > 0){
        return true;
      }
      return false;
    }

    guardarUsuario(usuario: Usuario) : void
    {
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
    }

    
    registrarUsuario(usuario: Usuario) : Observable<any>
    {
      const urlEndpoint = `${HOST_BACKEND}/registrar`;
      return this.httpClient.post<any>(urlEndpoint, usuario);
    }

    iniciarSesion(usuario: Usuario) : Observable<any>
    {
      const urlEndpoint = `${HOST_BACKEND}/login`;
      console.log(JSON.stringify(usuario));
      return this.httpClient.post<any>(urlEndpoint, usuario);
    }

    cerrarSesion() : void
    {
      this._usuario = undefined;
      sessionStorage.clear();
    }
}