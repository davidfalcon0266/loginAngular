import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private servi: AuthService,
               private router: Router) { }

  ngOnInit() {
  }
  salir(){
    // esta funcion la llamamos del servicio y se encarga de el todestruir el toquen que se a credo
this.servi.logout();
this.router.navigateByUrl('/login');

  }

}
