import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post'; //se necesita para poder crear objetos desde el form
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService]
})
export class PostNewComponent implements OnInit {

  public page_title:string;
  public identity;
  public token;
  public post; //objeto de tipo post

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ){ 
    this.page_title = "Crear una entrada.";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    //console.log(this.identity);
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null); //lleno el nuevo con la plantilla de datos del modelo de post: id, user_id, category_id, title, content, image, createdAt
    //console.log(this.post);
  }

}
