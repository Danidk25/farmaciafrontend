import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  proveedor:any ={};
  proveedores: any =[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscarCliente();
  }

  //buscar clientes
  buscarCliente(){
    this.buscarClienteServicio().subscribe(
      (response:any) => this.proveedores = response
    )
  }
  buscarClienteServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bproveedor")
    .pipe(
      catchError(e => "error")
    );
  }
  //buscar clientes de forma ascendente
  buscarClienteAs(){
    this.buscarClienteAsServicio().subscribe(
      (response:any) => this.proveedores = response
    )
  }
  buscarClienteAsServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bproveedorasc")
    .pipe(
      catchError(e => "error")
    );
  }


    //crear clientes login


    crearUsuario(){
      let formFormulario:any = document.getElementById("formProveedor");
      let formValido:boolean = formFormulario.reportValidity();
      if(formValido){
        this.crearClienteServicio().subscribe(
          (response:any) => this.actualizar(response)
        )
      }
    }


    crearClienteServicio(){

      var httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      }
      return this.http.post<any>("http://localhost:8080/proyecto/aproveedor",this.proveedor,httpOptions)
      .pipe(
        catchError(e =>"error")
      );
    }
    //modificacion de clientes Login
  actualizar(proveedor:any){
    alert("Cliente guardado exitosamente con el id: "+ proveedor.codigoproveedor);
    this.buscarCliente();
    this.proveedor = {};
  }

  Limpiar(){
    this.proveedor = {};
  }

  modificar(u:any){
    this.proveedor =u;
  }

  //eliminacion de clientes
  Eliminar(u:any){
    this.eliminarClienteServicio(u.codigoproveedor).subscribe(
      (response:any) => this.actualizarEliminar(response)
    )
  }

  eliminarClienteServicio(codigoproveedor:any){
    return this.http.delete<any>("http://localhost:8080/proyecto/eliminarprov/"+codigoproveedor)
    .pipe(
      catchError(e =>"error")
    );
  }
  actualizarEliminar(response:any){
    alert("Cliente eliminado exitosamente");
    this.buscarClienteAs();
  }



}
