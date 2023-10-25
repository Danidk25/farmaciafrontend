import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { PaginainicioComponent } from './PAGINA INICIO/paginainicio/paginainicio.component';
import { BitacoraComponent } from './bitacora/bitacora/bitacora.component';


const routes: Routes = [
  {path:'', component: LoginComponent },
  {path:'bienvenida', component: BienvenidaComponent },
  {path: 'usuario',component: UsuarioComponent},
  {path: 'pagina',component: PaginainicioComponent},
  {path: 'bitacora',component: BitacoraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
