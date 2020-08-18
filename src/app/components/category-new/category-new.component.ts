import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //importamos rutas
import { UserService } from '../../services/user.service'; //importamos servicio de usuario, para poder acceder a token ets
import { Category } from '../../models/category'; //importamos el modelo de categoría para poder rellenar los datos con el form
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService]
})
export class CategoryNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public category: Category; //objeto que va a ser rellenado desde el form
  public status;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){ 
    this.page_title = "Crear nueva categoría";
    this.identity = this._userService.getIdentity(); //para obtener el objeto de usuario identificado a través de su servicio
    this.token = this._userService.getToken(); //método que devuelve el token de user identificado
    this.category = new Category(1,''); //nueva instancia de un objeto vacío de tipo category con valores por defecto id=1, descripcion=''
   }

  ngOnInit(): void {
  }

}
