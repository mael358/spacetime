import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { LoginService } from './login.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioSocial: SocialUser | undefined;
  usuarioLocal!: Usuario;

  constructor(private socialAuthService: SocialAuthService, private loginService: LoginService, private router: Router) { }
  titulo: string = "SpaceTime";

  ngOnInit(): void {
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

  cerrarSesionSocial() {
    this.socialAuthService.signOut();
  }

}
