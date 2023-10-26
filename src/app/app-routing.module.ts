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
import { InventarioComponent } from './inventario/inventario/inventario.component';
import { LaboratorioComponent } from './laboratorio/laboratorio/laboratorio.component';
import { MedicamentoComponent } from './medicamento/medicamento/medicamento.component';
import { ProveedorComponent } from './proveedor/proveedor/proveedor.component';
import { SucursalComponent } from './sucursal/sucursal/sucursal.component';
import { TrackingComponent } from './tracking/tracking/tracking.component';
import { PersonaComponent } from './persona/persona/persona.component';


const routes: Routes = [
  {path:'', component: LoginComponent },
  {path:'bienvenida', component: BienvenidaComponent },
  {path: 'usuario',component: UsuarioComponent},
  {path: 'pagina',component: PaginainicioComponent},
  {path: 'bitacora',component: BitacoraComponent},
  {path: 'cliente',component: ClienteComponent},
  {path: 'devoluciones', component: DevolucionesComponent},
  {path: 'empleado', component: EmpleadoComponent},
  {path: 'factura', component: FacturaComponent},
  {path: 'inventario', component: InventarioComponent},
  {path: 'laboratorio', component: LaboratorioComponent},
  {path: 'medicamento', component: MedicamentoComponent},
  {path: 'proveedor', component: ProveedorComponent},
  {path: 'sucursal', component: SucursalComponent},
  {path: 'tracking', component: TrackingComponent},
  {path: 'persona', component: PersonaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
