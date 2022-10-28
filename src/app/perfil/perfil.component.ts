import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../login/login.service';
import { Usuario } from '../login/usuario';
import { PerfilService } from './perfil.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  titulo: string = "SpaceTime";
  usuario: Usuario;
  puedeEditar: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute, 
    private perfilService: PerfilService) { }
  
  ngOnInit(): void {
    let usuarioLoggeado = this.loginService.usuario;
    this.activatedRoute.params.subscribe(params => {
      let idUsuario = params['id'];
      if (idUsuario)
      {
        this.perfilService.ObtenerDatosUsuario(idUsuario).subscribe((user) => {
          this.usuario = user
          if (usuarioLoggeado.idusr == this.usuario.idusr)
            this.puedeEditar = true;
        })
      }
      else
      {
        Swal.fire('Error', 'No se ha encontrado el usuario buscado...', 'error')
        this.router.navigate(['/login']);
      }
    })

    
    if (this.usuario == undefined || this.usuario == null)
      this.router.navigate(['/login']);
  }

  actualizarUsuario(){

  }



}
