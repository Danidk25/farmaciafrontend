import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  bitacora:any = {};
  bitacoras: any =[];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscar();
  }
//buscar bitacoras
  buscar(){
    this.buscarServicio().subscribe(
      (response:any) => this.bitacoras = response
    )
  }
  buscarServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bbitacora")
    .pipe(
      catchError(e => "error")
    );
  }


  generarInformePDF() {
    const doc = new jsPDF();

    doc.text('Informe de Bitácora', 10, 10);

    // Obtén los datos de la tabla y agrégalos al informe
    const bitacoras = this.bitacoras;
    let y = 30;

    for (const bitacora of bitacoras) {
      doc.text(`ID: ${bitacora.idbitacora}`, 10, y);
      doc.text(`Tabla: ${bitacora.tabla}`, 50, y);
      doc.text(`Campo: ${bitacora.campo}`, 90, y);
      doc.text(`Campo: ${bitacora.llaveprimaria}`, 90, y);
      doc.text(`Campo: ${bitacora.valoranterior}`, 90, y);
      doc.text(`Campo: ${bitacora.valornuevo}`, 90, y);
      doc.text(`Campo: ${bitacora.fechacreacion}`, 90, y);
      doc.text(`Campo: ${bitacora.usuariocreacion}`, 90, y);
      doc.text(`Campo: ${bitacora.tipomovimiento}`, 90, y);
      doc.text(`Campo: ${bitacora.ipregistro}`, 90, y);
      y += 10; 
    }

    // Guarda el informe como un archivo PDF
    doc.save('informe_bitacora.pdf');
  }
}








