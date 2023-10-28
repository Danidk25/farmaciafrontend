import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  empleado:any ={};
  empleados: any =[];


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscarEmpleado();
  }
//buscar clientes
buscarEmpleado(){
  this.buscarEmpleadoServicio().subscribe(
    (response:any) => this.empleados = response
  )
}
buscarEmpleadoServicio():Observable<any>{
  return this.http.get<any>("http://localhost:8080/proyecto/bempleado")
  .pipe(
    catchError(e => "error")
  );
}
//buscar clientes de forma ascendente
buscarClienteAs(){
  this.buscarClienteAsServicio().subscribe(
    (response:any) => this.empleado = response
  )
}
buscarClienteAsServicio():Observable<any>{
  return this.http.get<any>("http://localhost:8080/proyecto/bempleadoasc")
  .pipe(
    catchError(e => "error")
  );
}


  //crear clientes login


  crearUsuario(){
    let formFormulario:any = document.getElementById("formEmpleado");
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
    return this.http.post<any>("http://localhost:8080/proyecto/aempleado",this.empleado,httpOptions)
    .pipe(
      catchError(e =>"error")
    );
  }
  //modificacion de clientes Login
actualizar(empleado:any){
  alert("Cliente guardado exitosamente con el id: "+ empleado.codigocliente);
  this.buscarEmpleado();
  this.empleado  = {};
}

Limpiar(){
  this.empleado = {};
}

modificar(u:any){
  this.empleado =u;
}

//eliminacion de clientes
Eliminar(u:any){
  this.eliminarClienteServicio(u.codigoempleado).subscribe(
    (response:any) => this.actualizarEliminar(response)
  )
}

eliminarClienteServicio(codigoempleado:any){
  return this.http.delete<any>("http://localhost:8080/proyecto/eliminaremp/"+codigoempleado)
  .pipe(
    catchError(e =>"error")
  );
}
actualizarEliminar(response:any){
  alert("Cliente eliminado exitosamente");
  this.buscarClienteAs();
}


}
