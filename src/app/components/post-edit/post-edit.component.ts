import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post'; //se necesita para poder crear objetos desde el form
import { User } from 'src/app/models/user';
import { global } from '../../services/global';


@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

  public page_title:string;
  public identity;
  public token;
  public post: Post; //objeto de tipo post
  public categories;
  public status;
  public is_edit: boolean;
  public resetVar = true; //para afu

  public afuConfig = { //configuración de angular file uploader que utilizaremos para subir la foto del post
    multiple: false,
    formatsAllowed: ".jpg, .png,.gif, .jpeg",
    maxSize: "50",

    uploadAPI:  {
      url: global.url+'post/upload',
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
    attachPinText: 'Sube tu imagen de post'
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService
  ){ 
    this.page_title = "Editar entrada.";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
  }

  ngOnInit(): void {
    //console.log(this.identity);
    this.getCategories(); //se llama desde el principio para poder llenar el select
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null); //lleno el nuevo con la plantilla de datos del modelo de post: id, user_id, category_id, title, content, image, createdAt
    this.getPost();

  }

  getCategories(){
    this._categoryService.getCategories().subscribe( //llamada al servicio de categorias
      response => {
        if(response.status == 'success'){
          this.categories = response.categories; //rellenamos el objeto
          //console.log(this.categories);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getPost(){
    //Sacar el id del post de la url
    this._route.params.subscribe(
      params => {
         let id = +params['id']; //extraigo la id del arreglo params URL el + sirve para convertirlo a integer, por default es string
         //console.log(id);

        //Hacer petición ajax para sacar los datos
        this._postService.getPost(id).subscribe(
          response => {
            if(response.status=='success'){
              this.post = response.post;
              //console.log(this.post); 

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

  imageUpload(data){ //este método es invocado desde el componente afu que sube la imágen, sirve para agregar la imágen al objeto de post que luego será enviado
    console.log(JSON.parse(data.response)); //guardo lo que me responde el backend parseado para poder extraer cosas
    let image_data = JSON.parse(data.response); //guardo lo que me responde el backend parseado para poder extraer cosas
    this.post.image = image_data.image; //agrego al objeto la imagen
  }
  
  onSubmit(form){
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          //this.post = response.post;
          //redirigir a la página del post
          this._router.navigate(['/entrada', this.post.id]);
        }else{
          this.status= 'error';
        }
      },
      error => {
        this.status= 'error';
        console.log(error);
      }
    )
  }

}