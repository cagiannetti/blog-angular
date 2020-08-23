import {Injectable} from '@angular/core'; //permite inyectar este servicio con las dependencias
import {HttpClient, HttpHeaders} from '@angular/common/http'; //para hacer las peticiones ajax, y cabeceras
import {Observable} from 'rxjs'; //para recoger datos de la Api, devolve     información 
import {Post} from '../models/post';
import {global} from './global'; //traigo configuraciones globales que creé


//definir clase del servicio
@Injectable() //Indico al decorador Injectable para que esto se pueda utilizar como servicio utilizando inyección de dependencias
export class PostService{

    public url: string;
    public identity;
    public token;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    pruebas(){
        return "Hola desde servicio de entradas!!";
    }

    create(token, post): Observable<any>{
        let json = JSON.stringify(post);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        
        return this._http.post(this.url + 'post', params, {headers: headers});

    }

    getPosts(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post', {headers: headers});
    }

    
     getPost(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + 'post/' + id , {headers: headers});
    }

}