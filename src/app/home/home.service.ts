import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import { HttpClient } from '@angular/common/http';
import { POSTS } from '../dummyData/posts.json';
import { HOST_BACKEND } from '../config/config';
import { POST_SUCCESS } from '../dummyData/postSuccessfull.json';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  getPosts() : Observable<Post[]>
  {
    let result = this.httpClient.get<Post[]>(`${HOST_BACKEND}/posts`);
    return of(POSTS);
  }

  crearPost(post: Post) : Observable<any>
  {
    return of(POST_SUCCESS);
    return this.httpClient.post<Post>(`${HOST_BACKEND}/post`, post);
  }

  darLikePost(post: Post, id_usuario: number): Observable<any> {
    return this.httpClient.post<Post>(`${HOST_BACKEND}/post/${id_usuario}`, post);
  }
}
