
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.css']
})
export class DevolucionesComponent implements OnInit {
  devoluciones: any =[];
  devolucion:any ={};

  constructor(private http:HttpClient) { }


  ngOnInit(): void {
    /////////////////
    this.buscarDevolucion();
  }

  //Busqueda de devoluciones
  buscarDevolucion(){
    this.buscarDevolucionServicio().subscribe(
      (response:any) => this.devoluciones = response
    )
  }
  buscarDevolucionServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bdevolucion")
    .pipe(
      catchError(e => "error")
    );
  }

  //crear devoluciones
  crearDevolucion(){
    let formFormulario:any = document.getElementById("formDevolucion");
    let formValido:boolean = formFormulario.reportValidity();
    if(formValido){
      this.crearDevolucionServicio().subscribe(
        (response:any) => this.actualizar(response)
      )
    }
  }


  crearDevolucionServicio(){

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:8080/proyecto/adevolucion",this.devolucion,httpOptions)
    .pipe(
      catchError(e =>"error")
    );
  }

//modificacion de usuarios Login
actualizar(devolucion:any){
  alert("Devolucion guardada exitosamente con el id: "+ devolucion.codigodevolucion);
  this.buscarDevolucion();
  this.devolucion = {};
}

Limpiar(){
  this.devolucion = {};
}

modificar(u:any){
  this.devolucion =u;
}



//Eliminar devolucion
Eliminar(u:any){
  this.eliminarDevolucionServicio(u.codigodevolucion).subscribe(
    (response:any) => this.actualizarEliminar(response)
  )
}

eliminarDevolucionServicio(codigodevolucion:any){
  return this.http.delete<any>("http://localhost:8080/proyecto/eliminardev/"+codigodevolucion)
  .pipe(
    catchError(e =>"error")
  );
}
actualizarEliminar(response:any){
  alert("Devolucion eliminada exitosamente");
  this.buscarDevolucion();
}
}
