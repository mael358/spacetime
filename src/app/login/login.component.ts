import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuarioSocial: SocialUser | undefined;
  public usuarioLocal: Usuario;

  constructor(private socialAuthService: SocialAuthService, private loginService: LoginService, private router: Router) { }
  titulo: string = "SpaceTime";

  ngOnInit(): void {
    this.usuarioLocal = new Usuario();
    if (this.loginService.yaInicioSesion())
      this.router.navigate(['/home']);


    this.usuarioLocal = this.usuarioLocal as Usuario;
    this.socialAuthService.authState.subscribe((user) => {
      this.usuarioSocial = user;
      let usuario = new Usuario();
      this.usuarioLocal.nombres = this.usuarioSocial.name;
      this.usuarioLocal.email = this.usuarioSocial.email;
      this.usuarioLocal.foto = this.usuarioSocial.response.picture.data.url;
      console.log(usuario);
      this.loginService.guardarUsuario(this.usuarioLocal);
    });
  }

  loggearseFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  login(){
    console.log(this.usuarioLocal);
    if (this.usuarioLocal.email == null || this.usuarioLocal.password == null){
      Swal.fire('Error', 'Usuario o contraseña vacias!', 'error');
      return;
    }

    this.loginService.iniciarSesion(this.usuarioLocal).subscribe(x => {

      this.loginService.guardarUsuario(x.usuario);
      this.router.navigate(['/home']);
    }, e => {
      console.log("error");
      Swal.fire('Error', 'Usuario o contraseña incorrecta!', 'error');
      
      if (e.status == 400){
        Swal.fire('Error', 'Usuario o contraseña incorrecta!', 'error');
      }
    });
  }

  cerrarSesionSocial() {
    this.socialAuthService.signOut();
  }

  cerrarSesion(){

  }

}
