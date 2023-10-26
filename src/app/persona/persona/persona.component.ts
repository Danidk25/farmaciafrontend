import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  persona:any ={};
  codigopersona:any ={};
  
  personas: any =[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscarPersona();
  }
  //Busqueda de usuarios login
  buscarPersona(){
    this.buscarPersonaServicio().subscribe(
      (response:any) => this.personas = response
    )
  }
  buscarPersonaServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bpersona")
    .pipe(
      catchError(e => "error")
    );
  }

  //buscar usuarios de forma descendente
  buscarPersonaAs(){
    this.buscarPersonaAsServicio().subscribe(
      (response:any) => this.personas = response
    )
  }
  buscarPersonaAsServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bpersonaasc")
    .pipe(
      catchError(e => "error")
    );
  }

  //crear usuarios login


  crearPersona(){
    let formFormulario:any = document.getElementById("formPersona");
    let formValido:boolean = formFormulario.reportValidity();
    if(formValido){
      this.crearPersonaServicio().subscribe(
        (response:any) => this.actualizar(response)
      )
    }
  }


  crearPersonaServicio(){

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:8080/proyecto/apersona",this.persona,httpOptions)
    .pipe(
      catchError(e =>"error")
    );
  }
//modificacion de usuarios Login
  actualizar(persona:any){
    alert("Persona guardado exitosamente con el id: "+ persona.codigopersona);
    this.buscarPersona();
    this.persona = {};
  }

  Limpiar(){
    this.persona = {};
  }

  modificar(u:any){
    this.persona =u;
  }

  //eliminacion de usuarios login
  Eliminar(u:any){
    this.eliminarUsuarioServicio(u.codigopersona).subscribe(
      (response:any) => this.actualizarEliminar(response)
    )
  }

  eliminarUsuarioServicio(codigopersona:any){
    return this.http.delete<any>("http://localhost:8080/proyecto/eliminarpers/"+codigopersona)
    .pipe(
      catchError(e =>"error")
    );
  }
  actualizarEliminar(response:any){
    alert("Persona eliminada exitosamente");
    this.buscarPersonaAs();
  }
}
