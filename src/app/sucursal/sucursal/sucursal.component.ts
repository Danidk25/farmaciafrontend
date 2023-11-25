import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  sucursal:any ={};
  sucursales:any ={};

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscarSucursal();
  }

  buscarSucursal(){
    this.buscarSucursalServicio().subscribe(
      (response:any) => this.sucursales = response
    )
  }

  buscarSucursalServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bsucursal")
    .pipe(
      catchError(e => "error")
    );
  }

  crearSucursal(){
    let formFormulario:any = document.getElementById("formSucursal");
    let formValido:boolean = formFormulario.reportValidity();
    if(formValido){
      this.crearSucursalServicio().subscribe(
        (response:any) => this.actualizar(response)
      )
    }
  }

  crearSucursalServicio(){
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:8080/proyecto/asucursal",this.sucursal,httpOptions)
    .pipe(
      catchError(e =>"error")
    );
  }

  actualizar(sucursal:any){
    alert("Sucursal guardado exitosamente con el id: "+ sucursal.codigosucursal);
    this.buscarSucursal();
    this.sucursal = {};
  }

  Limpiar(){
    this.sucursal = {};
  }

  modificar(u:any){
    this.sucursal =u;
  }

  Eliminar(u:any){
    this.eliminarSucursalServicio(u.codigosucursal).subscribe(
      (response:any) => this.actualizarEliminar(response)
    )
  }

  eliminarSucursalServicio(codigosucursal:any){
    return this.http.delete<any>("http://localhost:8080/proyecto/eliminarsucursal/"+codigosucursal)
    .pipe(
      catchError(e =>"error")
    );
  }
  actualizarEliminar(response:any){
    alert("Sucursal eliminada exitosamente");
    this.buscarSucursal();
  }
}
