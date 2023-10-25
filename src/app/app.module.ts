import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { PaginainicioComponent } from './PAGINA INICIO/paginainicio/paginainicio.component';
import { BitacoraComponent } from './bitacora/bitacora/bitacora.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BienvenidaComponent,
    UsuarioComponent,
    PaginainicioComponent,
    BitacoraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
