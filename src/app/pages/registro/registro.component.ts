import { Component, OnInit } from '@angular/core';
// para hacer una instancia del usurio model
import { UsuarioModel } from '../../models/usuario.model';

// para poder usar formulario hay que importar esto
import { NgForm } from '@angular/forms';
// llamamos al servicio que hemos creado para aplicar sus funciones
import { AuthService } from '../../services/auth.service';

// para poder navegar
import { Router } from '@angular/router';

// para mostrar los alert y los louding
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

// para imporatrlo
  usuario: UsuarioModel;
   error: string;
  //  creamos esta variable ´para guardar el usuario y recordarlo en el localstorage
   recordarme = false;


  constructor( private serv: AuthService,
               private router: Router) { }

  ngOnInit() {

    // aqui creamos una nva instancia del usuariomodel
    // con esto ya obtenemos todo de esa funcion y se lo podemos aplicar a los campos que tenems en el formulario
    this.usuario = new UsuarioModel();


    // this.usuario.email = '';
  }

  // esta es la informacion que recibo del formulario
    onSubmit(f: NgForm) {
    // si el fomulario es invalido no va a entrar
if ( f.invalid ) { return; }
Swal.fire({
        text: 'Espere por favor',
        icon: 'info',
        allowOutsideClick: false
      });
      // muestra icono como louding
Swal.showLoading();


// aqui estamos enviando el usuario a la funcion que creamos en el servicio
this.serv.nuevoUsuario( this.usuario).subscribe( data => {
  // console.log(data);
  Swal.close();

// si el usuario presiona recordarme entonces guardamos en el localstorage
  if (this.recordarme) {
localStorage.setItem('email', this.usuario.email);


}

// para mostrar si se registro con exito
  Swal.fire({
    icon: 'success',
    title: 'Registrado con exito',
    showConfirmButton: false,
    timer: 1500
  });
  this.router.navigateByUrl('/home');


  // con esta funcion mostramos el error
}, (err => {
   this.error =  err.error.error.message;
  //  console.log(this.error)

   Swal.fire({
      type: 'error',
     title: 'Error al autenticar',
      text: this.error,
      icon: 'error',
    });
}));

// console.log(this.usuario);
// console.log(f);

  }

}
