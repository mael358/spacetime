import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { POSTS } from './posts.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  posts: Post[] = POSTS;

  ngOnInit(): void {
  }

  
}
