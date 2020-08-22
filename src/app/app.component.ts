import { Component, OnInit, DoCheck } from '@angular/core'; //onInit permite hacer algo al inicio y docheck hacer algo cuando hay algún cambio en la aplicacion
import { UserService } from './services/user.service'; //importo el servicio de usuario
import { CategoryService } from './services/category.service'; //importo el servicio de categoria para poder usar sus métodos, ej listar
import { global }from './services/global'; //importo global para poder saber la url del proyecto

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService] //cargo los servicios importados en el componente
})

export class AppComponent implements OnInit, DoCheck{
  public title = 'blog-angular';
  public identity;
  public token;
  public url;
  public categories;

  constructor(
    private _userService: UserService, //creo la propiedad _userService de tipo UserService
    private _CategoryService: CategoryService
  ){
    this.loadUser();
    this.url = global.url;
  }

  ngOnInit(){// se ejecuta siempre
    console.log('Webapp cargada correctamente!');
    this.getCategories();
  }

  ngDoCheck(){ //se ejecuta cuando se produzca un cambio, para que la barra de menú se actualice correctamente
    this.loadUser();
  }
  
  loadUser(){ //método que carga los datos del usuario desde el localstorage
    this.identity = this._userService.getIdentity(); //obtenemos el dato del localstorage con el metodo getIdentity(), con esto tenemos la variable identity disponible en la vista principal
    this.token = this._userService.getToken(); //traemos el token almacentado en el localstorage
  }

  getCategories(){
    this._CategoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success'){
          this.categories = response.categories;
          console.log(this.categories);
        }
      },
      error => {
        console.log(error);
      }
    );
  }


}
