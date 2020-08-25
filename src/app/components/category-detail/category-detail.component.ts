import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //importamos rutas
import { Category } from '../../models/category'; //importamos el modelo de categoría para poder rellenar los datos con el form
import { CategoryService } from '../../services/category.service'; //importamos servicio de categoría que se va a comunicar con la API
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [CategoryService, UserService, PostService]
})
export class CategoryDetailComponent implements OnInit {

  public page_title: string;
  public category: Category;
  public posts: any;
  public url: string;
  public identity;
  public token;


  constructor( //inyección de servicios
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoryService: CategoryService,
    private _userService:UserService,
    private _postService:PostService
  ){
    this.url = global.url;
    this.identity = this._userService.getIdentity();
    this.token =  this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }

  getPostsByCategory(){
    this._route.params.subscribe(params => {
      let id = +params['id']; //obtengo datos de la url
      
      this._categoryService.getCategory(id).subscribe(
        response => {
          if(response.status=='success'){
            //console.log(response);
            this.category=response.category;

            //obtenemos los post de la categoría actual
            this._categoryService.getPosts(id).subscribe(
              response => {
                if(response.status=='success'){
                  this.posts = response.posts;
                  console.log(this.posts);
                }else{
                  this._router.navigate(['/inicio']);
                }
              },
              error => {
                console.log(error);
                this._router.navigate(['/inicio']);
              }
            );
          }else{
            this._router.navigate(['/inicio']);
          }
        },
        error => {
          console.log(error);
        }
      );
    })
  }

  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPostsByCategory();
      },
      error => {
        console.log(error);
      }
    );
  }



  

}
