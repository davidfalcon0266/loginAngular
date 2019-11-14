import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// importamos esto para los formularios
import { FormsModule } from '@angular/forms';
// import { AuthGuard } from '../app/guards/auth.guard';

// para poder hacer peticiones de afuera a una api
import { HttpClientModule } from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [
    // AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
