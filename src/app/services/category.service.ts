import {Injectable} from '@angular/core'; //permite inyectar este servicio con las dependencias
import {HttpClient, HttpHeaders} from '@angular/common/http'; //para hacer las peticiones ajax, y cabeceras
import {Observable} from 'rxjs'; //para recoger datos de la Api, devolve     información 
import {Category} from '../models/category';
import {global} from './global'; //traigo configuraciones globales que creé


//definir clase del servicio

@Injectable() //Indico al decorador Injectable para que esto se pueda utilizar como servicio utilizando inyección de dependencias
export class CategoryService{ //como se va a llamar el servicio

    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    create(token, category):Observable<any>{  
        let json=JSON.stringify(category);
        let params = "json="+json; //configuro la cadena que voy a enviar por POST

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        
        return this._http.post(this.url + 'category', params, {headers: headers}); //realiza el envío por post vía ajax
    }

    getCategories():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'category', {headers: headers}); //hace la petición get via ajax que devuelve todas las categorías
    }

    
    getCategory(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'category/' + id, {headers: headers}); //hace la petición get via ajax que devuelve una categoría por su id
    }

    getPosts(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + 'post/category/' + id, {headers: headers}); //hace la petición get via ajax que devuelve todos los posts de una categoría
    }
}

