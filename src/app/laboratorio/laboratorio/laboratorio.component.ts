import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['./laboratorio.component.css']
})
export class LaboratorioComponent implements OnInit {
  laboratorio:any ={};
  laboratorios:any ={};

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscarLaboratorio();
  }

  buscarLaboratorio(){
    this.buscarLaboratorioServicio().subscribe(
      (response:any) => this.laboratorios = response
    )
  }

  buscarLaboratorioServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/blaboratorio")
    .pipe(
      catchError(e => "error")
    );
  }

  crearLaboratorio(){
    let formFormulario:any = document.getElementById("formLaboratorio");
    let formValido:boolean = formFormulario.reportValidity();
    if(formValido){
      this.crearLaboratorioServicio().subscribe(
        (response:any) => this.actualizar(response)
      )
    }
  }

  crearLaboratorioServicio(){
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:8080/proyecto/alaboratorio",this.laboratorio,httpOptions)
    .pipe(
      catchError(e =>"error")
    );
  }

  actualizar(laboratorio:any){
    alert("Laboratorio guardado exitosamente con el id: "+ laboratorio.codigolaboratorio);
    this.buscarLaboratorio();
    this.laboratorio = {};
  }

  Limpiar(){
    this.laboratorio = {};
  }

  modificar(u:any){
    this.laboratorio =u;
  }

  Eliminar(u:any){
    this.eliminarLaboratorioServicio(u.codigolaboratorio).subscribe(
      (response:any) => this.actualizarEliminar(response)
    )
  }

  eliminarLaboratorioServicio(codigolaboratorio:any){
    return this.http.delete<any>("http://localhost:8080/proyecto/eliminarlaboratorio/"+codigolaboratorio)
    .pipe(
      catchError(e =>"error")
    );
  }
  actualizarEliminar(response:any){
    alert("Laboratorio eliminada exitosamente");
    this.buscarLaboratorio();
  }
}
