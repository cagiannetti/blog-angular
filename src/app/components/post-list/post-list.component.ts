import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
/* input es para poder recibir los parámetros que le envía el componente padre (el que hace el llamado)
el Output y Event Emitter es para que funcione el metodo delete, envía parámetros de vuelta*/

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  //recibimos los parámetros de la solicitud del componente padre
  @Input() posts;
  @Input() identity;
  @Input() url;

  @Output() delete = new EventEmitter(); //para que funcione el delete

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.posts, this.identity);
  }

  deletePost(post_id){
    this.delete.emit(post_id); //este método deletePost es común a todas las vistas, la variable delete que es de tipo EventEmitter, para poder utilizar el metodo .emit, que lo que hara es como un return, nos va a devolver un dato (en este caso el id del post que recogimos) 
  }

}
