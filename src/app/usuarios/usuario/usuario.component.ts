import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario:any ={};
  idusuario: any={};
  nombreusuario:any ={};
  password:any ={};
  rol:any = {};
  usuarios: any =[];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscarUsuario();
  }

  //Busqueda de usuarios login
  buscarUsuario(){
    this.buscarUsuarioServicio().subscribe(
      (response:any) => this.usuarios = response
    )
  }
  buscarUsuarioServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/busuario")
    .pipe(
      catchError(e => "error")
    );
  }

  //buscar usuarios de forma descendente
  buscarUsuarioAs(){
    this.buscarUsuarioServicio().subscribe(
      (response:any) => this.usuarios = response
    )
  }
  buscarUsuarioAsServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/busuarioasc")
    .pipe(
      catchError(e => "error")
    );
  }

  //crear usuarios login


  crearUsuario(){
    let formFormulario:any = document.getElementById("formUsuario");
    let formValido:boolean = formFormulario.reportValidity();
    if(formValido){
      this.crearUsuarioServicio().subscribe(
        (response:any) => this.actualizar(response)
      )
    }
  }


  crearUsuarioServicio(){

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:8080/proyecto/ausuario",this.usuario,httpOptions)
    .pipe(
      catchError(e =>"error")
    );
  }
//modificacion de usuarios Login
  actualizar(usuario:any){
    alert("Usuario guardado exitosamente con el id: "+ usuario.idusuario);
    this.buscarUsuario();
    this.usuario = {};
  }

  Limpiar(){
    this.usuario = {};
  }

  modificar(u:any){
    this.usuario =u;
  }

  //eliminacion de usuarios login
  Eliminar(u:any){
    this.eliminarUsuarioServicio(u.idusuario).subscribe(
      (response:any) => this.actualizarEliminar(response)
    )
  }

  eliminarUsuarioServicio(idusuario:any){
    return this.http.delete<any>("http://localhost:8080/proyecto/eliminarul/"+idusuario)
    .pipe(
      catchError(e =>"error")
    );
  }
  actualizarEliminar(response:any){
    alert("Usuario eliminado exitosamente");
    this.buscarUsuarioAs();
  }

}
