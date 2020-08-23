import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; //importo librería del router para poder sacar cosas de la url hacer redirecciones etx
import { User } from '../../models/user'; //importamos el modelo de usuario
import { UserService } from '../../services/user.service'; //importamos el servicio


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  //propiedades: 
  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;
  
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.page_title='Identificate';
    this.user=new User(1, '', '', 'ROLE_USER', '', '', '','');
  }

  ngOnInit() {
    //Se ejecuta siempre y cierra sesión solo cuando le llega el parámetro 'sure' por la url
    this.logout();
  }

  onSubmit(form){
    //console.log(this.user);
    this._userService.signup(this.user).subscribe( //obtengo el token
      response => {
        //console.log(response); //la repuesta es el token
        //TOKEN
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;

          //OBJETO USUARIO IDENTIFICADO
          this._userService.signup(this.user, true).subscribe( //obtengo los datos del usuario
            response => {
                this.identity = response;
               
                //PERSISTIR DATOS DEL USUARIO IDENTIFICADO en local storage
                //console.log(this.token);
                //console.log(this.identity);
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                //Redirección a la página principal
                this._router.navigate(['inicio']);
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          );

        }else{
          this.status = 'error';
          console.log(response); //mostrar el error que programamos en el backend
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  logout(){ //utilizo la librería router
    this._route.params.subscribe(params =>{
      let logout = +params['sure'] //en 'sure' me llega un string con un número, con el + convierto el string de la url en un entero

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;
         
        //Redirección a la página principal
        this._router.navigate(['inicio']);
      }

    });
  }

}
