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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BienvenidaComponent,
    UsuarioComponent,
    PaginainicioComponent,
    BitacoraComponent,
    ClienteComponent,
    DevolucionesComponent,
    EmpleadoComponent,
    FacturaComponent,
    InventarioComponent,
    LaboratorioComponent,
    MedicamentoComponent,
    ProveedorComponent,
    SucursalComponent,
    TrackingComponent,
    PersonaComponent
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
