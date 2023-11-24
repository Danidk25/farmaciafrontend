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
    const fontSize = 12;
    const lineHeight = 15;

    // Configuración del título
    doc.setFontSize(fontSize + 4);
    doc.text('Informe de Bitácora', 20, 20);

    // Configuración de las columnas
    doc.setFontSize(fontSize);
    const columnX1 = 20;
    const columnX2 = 40;
    const columnX3 = 60;
    const columnX4 = 100;

    // Obtén los datos de la tabla y agrégalos al informe
    const bitacoras = this.bitacoras;
    let y = 40;

    // Encabezados de columna
    doc.text('ID', columnX1, y);
    doc.text('Tabla', columnX2, y);
    doc.text('Campo', columnX3, y);
    doc.text('Fecha Creación', columnX4, y);
    doc.text('Tipo Movimiento', columnX4 + 40, y);

    y += lineHeight;

    for (const bitacora of bitacoras) {
      doc.text(bitacora.idbitacora.toString(), columnX1, y);
      doc.text(bitacora.tabla, columnX2, y);
      doc.text(bitacora.campo, columnX3, y);

      // Formatear la fecha usando toLocaleDateString()
      const fechaCreacion = new Date(bitacora.fechacreacion);
      const fechaFormateada = fechaCreacion.toLocaleDateString();

      doc.text(fechaFormateada, columnX4, y);
      doc.text(bitacora.tipomovimiento, columnX4 + 40, y);

      y += lineHeight;
    }

    // Guarda el informe como un archivo PDF
    doc.save('informe_escencial.pdf');
  }


}








