import {Injectable} from '@angular/core'; //permite inyectar este servicio con las dependencias
import {HttpClient, HttpHeaders} from '@angular/common/http'; //para hacer las peticiones ajax, y cabeceras
import {Observable} from 'rxjs'; //para recoger datos de la Api, devolve     información 
import {User} from '../models/user';
import {global} from './global'; //traigo configuraciones globales que creé


//definir clase del servicio

@Injectable() //Indico al decorador Injectable para que esto se pueda utilizar como servicio utilizando inyección de dependencias
export class UserService{

    public url: string;
    public identity;
    public token;

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
        let params = 'json='+json; //arma el parámetro que irá en el body del request para que el backend lo procese
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //envía los datos con el formato estandar de un forulario html, como es esperado enel backend por laravel

        return this._http.post(this.url+'register', params, {headers: headers}); //realiza la petición ajax
        
    }

    signup(user, gettoken = null): Observable<any>{ //método para autenticar al usuario

        if(gettoken != null){
            user.gettoken = 'true';
        }

        let json = JSON.stringify(user);
        let params = 'json='+json; //arma el parámetro que irá en el body del request para que el backend lo procese
        //console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); //envía los datos con el formato estandar de un forulario html, como es esperado enel backend por laravel

        return this._http.post(this.url+'login', params, {headers: headers}); //realiza la petición ajax

    }

    getIdentity(){ //método para obtener los datos del usuario identificado desde el local storage
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity && identity != 'undefined'){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){ //método para obtener el token del usuario autenticado desde el local storage
        let token = localStorage.getItem('token');

        if(token && token != 'undefined'){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }

}