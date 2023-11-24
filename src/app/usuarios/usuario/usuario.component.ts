import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import jsPDF from 'jspdf';


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

  generarInformePDF() {
    const doc = new jsPDF();
    const fontSize = 12;
    const lineHeight = 15;

    // Configuración del título
    doc.setFontSize(fontSize + 4);
    doc.text('Informe de Usuarios', 20, 20);

    // Configuración de las columnas
    doc.setFontSize(fontSize);
    const columnX1 = 20;
    const columnX2 = 60;
    const columnX3 = 100;


    // Obtén los datos de la tabla y agrégalos al informe
    const usuarios = this.usuarios;
    let y = 40;

    // Encabezados de columna
    doc.text('ID', columnX1, y);
    doc.text('Usuario', columnX2, y);
    doc.text('Rol', columnX3, y);

    y += lineHeight;

    for (const usuario of usuarios) {
      doc.text(usuario.idusuario.toString(), columnX1, y);
      doc.text(usuario.nombreusuario, columnX2, y);
      doc.text(usuario.rol, columnX3, y);
      y += lineHeight;
    }


    // Guarda el informe como un archivo PDF
    doc.save('informe_usuarios.pdf');
  }



}
