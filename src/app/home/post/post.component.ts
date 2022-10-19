import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { read } from 'fs';
import { LoginService } from 'src/app/login/login.service';
import Swal from 'sweetalert2';
import { HomeService } from '../home.service';
import { Post } from '../post';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  nuevoPost: Post = new Post();
  fotoSeleccionada: File;


  constructor(public modalService: ModalService, public homeService: HomeService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    
    this.nuevoPost.usuario = this.loginService.usuario;
    if (this.nuevoPost.usuario == undefined || this.nuevoPost.usuario == null)
      this.router.navigate(['/login']);
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen', 'El archivo debe ser un tipo imagen', 'error');
      this.fotoSeleccionada = null;
      return;
    }
    this.nuevoPost.img = this.getBase64(this.fotoSeleccionada);
  }

  subirPost() {
    if (!this.fotoSeleccionada && 
      (this.nuevoPost.contenido == null || this.nuevoPost.contenido == '' || this.nuevoPost.contenido == undefined)) 
    {
      Swal.fire('Error', 'Debe seleccionar una foto', 'error');
    } 
    else 
    {
      console.log(this.nuevoPost);
      this.homeService.crearPost(this.nuevoPost).subscribe(response => 
      {
        Swal.fire('Perfecto!', 'Has realizado el post correctamente', 'success')
        //TODO: hacer un handle adecuado para la respuesta del back
        this.cerrarModal()
      },
      e => 
      {
        console.log("Se ha producido un error.");
      })
    }
  }

  
  cerrarModal() 
  {
    this.modalService.cerrarModal();
  }

  getBase64(file: File) : string | ArrayBuffer {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result;
    };
    reader.onerror = function (error) {
      return '';
    };
    return reader.result;
 }

}
