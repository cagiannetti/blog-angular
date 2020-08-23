import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {

  public post: Post;

  constructor(
    private _postService:PostService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    
    //Sacar el id del post de la url
    this._route.params.subscribe(
      params => {
         let id = +params['id']; //extraigo la id del arreglo params URL el + sirve para convertirlo a integer, por default es string
         console.log(id);

        //Hacer petición ajax para sacar los datos
        this._postService.getPost(id).subscribe(
          response => {
            if(response.status=='success'){
              this.post = response.post;
              console.log(this.post); 

            }else{
              this._router.navigate(['/inicio']);
            }
          },
          error=> {
            console.log(error);
            this._router.navigate(['/inicio']);
          }
        );

    });
    


  }

}
