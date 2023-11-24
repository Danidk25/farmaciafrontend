import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import jsPDF from 'jspdf';

// Tu código sigue aquí

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css']
})
export class MedicamentoComponent implements OnInit {
  medicamento:any = {};
  medicamentos: any = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscarMedicamento();
  }

  buscarMedicamento(){
    this.buscarMedicamentoServicio().subscribe(
      (response:any) => this.medicamentos = response
    )
  }

  buscarMedicamentoServicio():Observable<any>{
      return this.http.get<any>("http://localhost:8080/proyecto/bmedicamento")
      .pipe
      (catchError(e => "error"))
  }

  crearMedicamento(){
    let formFormulario:any = document.getElementById("forMedicamento");
    let formValido:boolean = formFormulario.reportValidity();
    if(formValido){
      this.crearMedicamentoServicio().subscribe(
        (response:any) => this.actualizar(response)
      )
    }
  }

  crearMedicamentoServicio(){
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:8080/proyecto/amedicamento",this.medicamento,httpOptions)
    .pipe(
      catchError(e =>"error")
    );
  }

  //modificar medicamentos
  actualizar(medicamento:any){
    alert("Medicamento guardado exitosamente con el id: " + medicamento.codigomedicamento);
    this.buscarMedicamento();
    this.medicamento = {};
  }

  Limpiar(){
    this.medicamento = {};
  }

  modificar(u:any){
    this.medicamento = u;
  }

  Eliminar(u:any){
    this.eliminarMedicamentoServicio(u.codigomedicamento).subscribe(
      (response:any) => this.actualizarEliminar(response)
    )
  }

  eliminarMedicamentoServicio(codigomedicamento:any){
    return this.http.delete<any>("http://localhost:8080/proyecto/eliminarmed/" + codigomedicamento)
    .pipe(
      catchError(e =>"error")
    );
  }

  actualizarEliminar(response:any){
    alert("Medicamento eliminado exitosamente");
    this.buscarMedicamento();
  }





}
