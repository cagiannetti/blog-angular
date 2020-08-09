import {Injectable} from '@angular/core'; //permite inyectar este servicio con las dependencias
import {HttpClient, HttpHeaders} from '@angular/common/http'; //para hacer las peticiones ajax, y cabeceras
import {Observable} from 'rxjs'; //para recoger datos de la Api, devolve     información 
import {User} from '../models/user';
import {global} from './global'; //traigo configuraciones globales que creé


//definir clase del servicio

@Injectable() //Indico al decorador Injectable para que esto se pueda utilizar como servicio utilizando inyección de dependencias
export class UserService{

    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    test(){
        return "Hola mundo desde un servicio!!";
    }

    register(user): Observable<any>{ //le indico que este método va a devolver un Observable donde va a ir la respuesta del api desde el backend
        let json = JSON.stringify(user);
        let params = 'json='+json;
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //envía los datos con el formato estandar de un forulario html, como es esperado enel backend por laravel

        return this._http.post(this.url+'register', params, {headers: headers});
        
    }

}