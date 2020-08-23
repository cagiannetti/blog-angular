import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user'; //importo el modelo de usuario
import { UserService } from '../../services/user.service'; //se comunica con la API, me permite tener acceso a getIdentity y getToken
import { global } from '../../services/global'; //para obtener la ruta global de la app

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService] //cargo el servicio
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User; //utilizo el modelo de usuario
  public identity;
  public token;
  public status:string;
  public url;
  public resetVar = true; //para afu en vista necesita esta variable

  /*public froala_options:Object={
    charCounterCount: true,
    toolBarButtons:['bold','italic','underline','paragraphFormat','alert'],
    toolBarButtonsXS:['bold','italic','underline','paragraphFormat','alert'],
    toolBarButtonsSm:['bold','italic','underline','paragraphFormat','alert'],
    toolBarButtonsMD:['bold','italic','underline','paragraphFormat','alert']
  };*/

  public afuConfig = { //configuración de angular file uploader que utilizaremos para subir la foto del avatar
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif, .jpeg",
    maxSize: "50",

    uploadAPI:  {
      url: global.url+'user/upload',
      method:"POST",
      headers: {
     "Authorization" : this._userService.getToken()
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    fileNameIndex: true, 
    attachPinText: 'Sube tu avatar de usuario'
};

  constructor(
    private _userService: UserService
  ) { 
    this.page_title = 'Ajustes de usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '',''); //creo una instancia del objeto user con propiedades por default que se van a modificar desde el form
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url; //cargo en la propiedad url del método actual la url del proyecto
    
    //Rellenar objeto usuario
    this.user = new User(
      this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email,
      '',
      this.identity.description,
      this.identity.image);
  }

  ngOnInit(): void {
  }

  onSubmit(form){ //formulario con datos del usuario para modificar
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if (response  && response.status) {
          
          console.log(response);
          console.log(response.changes);
          this.status = 'success';
          //console.log('variable status' + this.status);
          
          //Actualizar usuario en session y en localstorage
          if(response.changes.name){
            this.user.name = response.changes.name;
          }

          if(response.changes.surname){
            this.user.surname = response.changes.surname;
          }

          if(response.changes.email){
            this.user.email = response.changes.email;
          }

          if(response.changes.description){
            this.user.description = response.changes.description;
          }

          if(response.changes.image){
            this.user.image = response.changes.image;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
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

  avatarUpload(datos){ //este método es invocado desde el componente afu que sube la imágen, sirve para agregar la imágen al objeto de usuario que luego será enviado
    console.log(JSON.parse(datos.response)); //guardo lo que me responde el backend parseado para poder extraer cosas
    let data = JSON.parse(datos.response); //guardo lo que me responde el backend parseado para poder extraer cosas
    this.user.image = data.image; //agrego al objeto la imagen
  }

}
