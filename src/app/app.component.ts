import { Component, OnInit, DoCheck } from '@angular/core'; //onInit permite hacer algo al inicio y docheck hacer algo cuando hay algún cambio en la aplicacion
import { UserService } from './services/user.service'; //importo el servicio de usuario

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService] //cargo el servicio de usuario
})
export class AppComponent implements OnInit, DoCheck{
  public title = 'blog-angular';
  public identity;
  public token;

  constructor(
    public _userService: UserService //creo la propiedad _userService de tipo UserService
  ){
    this.loadUser();    
  }

  ngOnInit(){// se ejecuta siempre
    console.log('Webapp cargada correctamente!');
  }

  ngDoCheck(){ //se ejecuta cuando se produzca un cambio, para que la barra de menú se actualice correctamente
    this.loadUser();
  }
  
  loadUser(){ //método que carga los datos del usuario desde el localstorage
    this.identity = this._userService.getIdentity(); //obtenemos el dato del localstorage con el metodo getIdentity(), con esto tenemos la variable identity disponible en la vista principal
    this.token = this._userService.getToken(); //traemos el token almacentado en el localstorage
  }


}
