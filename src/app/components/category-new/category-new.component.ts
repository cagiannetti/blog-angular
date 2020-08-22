import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //importamos rutas
import { UserService } from '../../services/user.service'; //importamos servicio de usuario, que se comunica con API y así puedo acceder a token
import { CategoryService } from '../../services/category.service'; //importamos servicio de categoría que se va a comunicar con la API
import { Category } from '../../models/category'; //importamos el modelo de categoría para poder rellenar los datos con el form
 


@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]
})
export class CategoryNewComponent implements OnInit {
  public page_title: string;
  public identity;
  public token;
  public category: Category; //objeto que va a ser rellenado desde el form
  public status: string;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService
  ){ 
    this.page_title = "Crear nueva categoría";
    this.identity = this._userService.getIdentity(); //para obtener el objeto de usuario identificado a través de su servicio
    this.token = this._userService.getToken(); //método que devuelve el token de user identificado
    this.category = new Category(1,''); //nueva instancia de un objeto vacío de tipo category con valores por defecto id=1, descripcion=''
   }

  ngOnInit(): void {
  }

  onSubmit(form){
    this._categoryService.create(this.token, this.category).subscribe( //el método subscribe del observable recoge la respuesta del API
      response => {
        if(response.status =='success'){
          this.category = response.category;
          this.status = 'success';

          this. _router.navigate(['/inicio']);
        }else{
          this.status='error';
        }
      },
      error => {
        this.status='error';
        console.log(<any>error);
      }
    )
  }
}
