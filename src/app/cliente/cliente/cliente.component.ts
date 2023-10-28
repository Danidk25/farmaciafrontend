import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  cliente:any ={};
  clientes: any =[];
  personas: any =[];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscarCliente();
  }


   //Busqueda de usuarios login
   buscarPersona(){
    this.buscarPersonaServicio(Response).subscribe(
      (response:any) => this.personas = response
    )
  }
  buscarPersonaServicio(codigopersona: any):Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto//buscar/id/"+ codigopersona)
    .pipe(
      catchError(e => "error")
    );
  }

//buscar clientes
  buscarCliente(){
    this.buscarClienteServicio().subscribe(
      (response:any) => this.clientes = response
    )
  }
  buscarClienteServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bcliente")
    .pipe(
      catchError(e => "error")
    );
  }
  //buscar usuarios de forma ascendente
  buscarClienteAs(){
    this.buscarClienteAsServicio().subscribe(
      (response:any) => this.clientes = response
    )
  }
  buscarClienteAsServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bclienteasc")
    .pipe(
      catchError(e => "error")
    );
  }


    //crear usuarios login


    crearUsuario(){
      let formFormulario:any = document.getElementById("formCliente");
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
      return this.http.post<any>("http://localhost:8080/proyecto/acliente",this.cliente,httpOptions)
      .pipe(
        catchError(e =>"error")
      );
    }
    //modificacion de usuarios Login
  actualizar(cliente:any){
    alert("Cliente guardado exitosamente con el id: "+ cliente.codigocliente);
    this.buscarCliente();
    this.cliente = {};
  }

  Limpiar(){
    this.cliente = {};
  }

  modificar(u:any){
    this.cliente =u;
  }

  //eliminacion de clientes
  Eliminar(u:any){
    this.eliminarClienteServicio(u.codigocliente).subscribe(
      (response:any) => this.actualizarEliminar(response)
    )
  }

  eliminarClienteServicio(codigocliente:any){
    return this.http.delete<any>("http://localhost:8080/proyecto/eliminarclie/"+codigocliente)
    .pipe(
      catchError(e =>"error")
    );
  }
  actualizarEliminar(response:any){
    alert("Cliente eliminado exitosamente");
    this.buscarClienteAs();
  }


}
