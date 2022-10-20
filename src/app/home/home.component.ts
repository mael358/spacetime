import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { HomeService } from './home.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ModalService } from './post/modal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private loginService: LoginService, private router: Router, private modalService: ModalService) { }
  titulo: string = "SpaceTime";
  posts: Post[] = [];

  ngOnInit(): void 
  {
    this.homeService.getPosts().subscribe(x => this.posts = x);
  }

  cerrarSesion()
  {
    this.loginService.cerrarSesion();
    this.router.navigate(['/login']);
  }

  abrirModal(){
    console.log("abriendo modal");
    this.modalService.abrirModal();
  }

}
