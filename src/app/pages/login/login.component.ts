import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
// importamos el servicio para utilizar los metodos que hemos creado
import { AuthService } from '../../services/auth.service';

// para navegar al home
import { Router } from '@angular/router';

// para mostrar los alerts lo importamos con el npm
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  error: string;
  recordarme = false;

  constructor( private serv: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
if ( form.invalid)  { return; }

// funcion para mostrar los mensajes
Swal.fire({
      text: 'Espere por favor',
      icon: 'info',
      allowOutsideClick: false
    });
    // muestra icono como louding
Swal.showLoading();

this.serv.login( this.usuario).subscribe(data => {
  console.log( data );

  // para cerrar el louding
  Swal.close();

  if (this.recordarme) {
localStorage.setItem('email', this.usuario.email);
}

  this.router.navigateByUrl('/home');

}, (err => {
  this.error = err.error.error.message;
  Swal.fire({
    type: 'error',
    title: 'Error al autenticar',
      text: this.error,
      icon: 'error',
    });
}));

}
}
