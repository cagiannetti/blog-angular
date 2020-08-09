import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService
  ) {
    this.page_title='Registrate';
    this.user=new User(1, '', '', 'ROLE_USER', '', '', '',''); //creo un objeto user con propiedades por default que se van a modificar desde el form
    /* propiedades de objeto user
        public id: number,
        public name: string,
        public surname: string,
        public role: string,
        public email: string,
        public password: string,
        public description: string,
        public image: string
    */
  }
  
  ngOnInit(): void {
    console.log('componente de registro lanzado!');
    console.log(this._userService.test());
  }

  onSubmit(form){ //cuando se envíe el formulario lo proceso acá
    //console.log(this.user);
    this._userService.register(this.user).subscribe( //metodo subscribe del obserbable tiene 2 funciones de callback response y error
      response => {
        //console.log(response);
        
        //ahora evaluaremos el estado de la petición para poder mostrar en la vista una cosa u otra
        if(response.status == 'success'){
          this.status = response.status;
          form.reset();
        }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );

  }

}
