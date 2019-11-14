import { Injectable } from '@angular/core';

// para poder usar el metod http
import { HttpClient } from '@angular/common/http';

// para recibir los datos que traemos del formulario
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  // para el login de nvos usuarios

private url: any = 'https://identitytoolkit.googleapis.com/v1/accounts';
// llave a clave que tengo para mi proyecto
private APIKEY: any = 'AIzaSyDhdxxgFLYDwZ6VeuZP9enCl7nbhHRNo9E';
  // para el login de nvos usuarios

  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  UserToken: string;


  // para autentificar el usuario

  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private http: HttpClient) { }

// para eliminar la cta
logout() {
localStorage.removeItem('token');

}

// para loguearse
login( usuario: UsuarioModel ) {

 const consultaUsuario = {
   email : usuario.email,
   password: usuario.password,
   returnSecureToken: true

 }

 return this.http.post(`${this.url}:signInWithPassword?key=${this.APIKEY}`, consultaUsuario)
   .pipe(
     map(data => {
     this.guardarToken(data['idToken']);
     console.log(data['idToken'])

     return data;

   }));

}

// para registra nvo usuario
// este usuario que le pasamos es e que obtenemos del formlario del registro
nuevoUsuario( usuario: UsuarioModel) {

 const enviarUsuario: any = {
// obtenems los valores que nos pide fireBase para poder registrarlos
  email: usuario.email,
  password: usuario.password,
   returnSecureToken: true

};
// hacemos este return por que el servicio va a ser utilizado en otra parte
 return this.http.post(`${ this.url }:signUp?key=${this.APIKEY}`, enviarUsuario
 ).pipe(map( data => {
   console.log(' entro al pipe ');
   this.guardarToken(data['idToken']);
   console.log(data['idToken']);
   return data;
 }));


}


  guardarToken(idToken: string) {

    this.UserToken = idToken;
    localStorage.setItem('token', idToken);
    // console.log(this.UserToken, 'user token');
  }





  obetenerToquen() {
if (localStorage.getItem('token')) {
this.UserToken = localStorage.getItem( 'token' );

} else {
  this.UserToken = '';
}
return this.UserToken;
  }



  autenticado(): boolean {
    // return false;
    // this.obetenerToquen();
    console.log(this.UserToken);
    if (this.UserToken == undefined){
      // if (this.UserToken.length > 2) {
       return false;
    } else {
if ( this.UserToken !== '') {
        return true;
    }
      } 
  }
}