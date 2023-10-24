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
    this.buscarUsuarioL();
  }

  //Busqueda de usuarios login
  buscarUsuarioL(){
    this.buscarUsuarioLServicio().subscribe(
      (response:any) => this.usuarios = response
    )
  }
  buscarUsuarioLServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/busuario")
    .pipe(
      catchError(e => "error")
    );
  }

  //crear usuarios login


  crearUsuarioL(){
    let formFormulario:any = document.getElementById("formUsuarioL");
    let formValido:boolean = formFormulario.reportValidity();
    if(formValido){
      this.crearUsuarioLServicio().subscribe(
        (response:any) => this.actualizar(response)
      )
    }
  }


  crearUsuarioLServicio(){

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
    this.buscarUsuarioL();
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
    this.eliminarUsuarioLServicio(u.idusuario).subscribe(
      (response:any) => this.actualizarEliminar(response)
    )
  }

  eliminarUsuarioLServicio(idusuario:any){
    return this.http.delete<any>("http://localhost:8080/proyecto/eliminarul/"+idusuario)
    .pipe(
      catchError(e =>"error")
    );
  }
  actualizarEliminar(response:any){
    alert("Usuario eliminado exitosamente");
    this.buscarUsuarioL();
  }

}
