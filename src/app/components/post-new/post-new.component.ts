import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post'; //se necesita para poder crear objetos desde el form
import { User } from 'src/app/models/user';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  public page_title:string;
  public identity;
  public token;
  public post: Post; //objeto de tipo post
  public categories;
  public status;
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
    this.page_title = "Crear una entrada.";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    //console.log(this.identity);
    this.getCategories(); //se llama desde el principio para poder llenar el select
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null); //lleno el nuevo con la plantilla de datos del modelo de post: id, user_id, category_id, title, content, image, createdAt
    //console.log(this.post);
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

  imageUpload(data){ //este método es invocado desde el componente afu que sube la imágen, sirve para agregar la imágen al objeto de post que luego será enviado
    console.log(JSON.parse(data.response)); //guardo lo que me responde el backend parseado para poder extraer cosas
    let image_data = JSON.parse(data.response); //guardo lo que me responde el backend parseado para poder extraer cosas
    this.post.image = image_data.image; //agrego al objeto la imagen
  }
  
  onSubmit(form){
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if (response.status == 'success'){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);
        }else{
          this.status = 'error';
        }
      },
      error => {
        console.log(error); 
        this.status = 'error';
      }
    );
  }

}