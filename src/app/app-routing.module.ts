import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { PaginainicioComponent } from './PAGINA INICIO/paginainicio/paginainicio.component';
import { BitacoraComponent } from './bitacora/bitacora/bitacora.component';
import { ClienteComponent } from './cliente/cliente/cliente.component';
import { DevolucionesComponent } from './devoluciones/devoluciones/devoluciones.component';
import { EmpleadoComponent } from './empleado/empleado/empleado.component';
import { FacturaComponent } from './factura/factura/factura.component';


const routes: Routes = [
  {path:'', component: LoginComponent },
  {path:'bienvenida', component: BienvenidaComponent },
  {path: 'usuario',component: UsuarioComponent},
  {path: 'pagina',component: PaginainicioComponent},
  {path: 'bitacora',component: BitacoraComponent},
  {path: 'cliente',component: ClienteComponent},
  {path: 'devoluciones', component: DevolucionesComponent},
  {path: 'empleado', component: EmpleadoComponent},
  {path: 'factura', component: FacturaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
