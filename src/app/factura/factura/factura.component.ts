import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { Chart } from 'chart.js';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  factura:any = {};
  facturas:any []= [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscarFactura();
    this.generarInformePDF();
  }

  buscarFactura(){
    this.buscarFacturaServicio().subscribe(
      (response:any) => this.facturas = response
    )
  }

  buscarFacturaServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bfactura")
    .pipe(
      catchError(e => "error")
    )
  }

  crearFactura(){
    let formFormulario:any = document.getElementById("formFactura");
    let formValido:boolean = formFormulario.reportValidity();
    if(formValido){
      this.crearFacturaServicio().subscribe(
        (response:any) => {
          this.actualizar(response); // Actualiza la lista de facturas
          this.obtenerFacturaCalculada(response.codigofactura); // Obtiene la factura recién insertada
        }
      )
    }
  }
  obtenerFacturaCalculada(codigoFactura: number) {
    this.http.get<any>("http://localhost:8080/proyecto/bfactura/" + codigoFactura)
      .subscribe(
        (response: any) => {
          this.factura.subtotal = response.subtotal;
          this.factura.total = response.total;
        }
      );
  }

  crearFacturaServicio(){
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:8080/proyecto/afactura",this.factura,httpOptions)
    .pipe(
      catchError(e => "error")
    );
  }

  actualizar(factura:any){
    alert("Factura guardada exitosamente con el id: " + factura.codigofactura);
    this.buscarFactura();
    this.factura = {};
  }

  Limpiar(){
    this.factura = {};
  }

  modificar(u:any){
    this.factura = u;
  }

  Eliminar(u:any){
    this.eliminarFacturaServicio(u.codigofactura).subscribe(
      (response:any) => this.actualizarEliminar(response)
    )
  }

  eliminarFacturaServicio(codigofactura:any){
    return this.http.delete<any>("http://localhost:8080/proyecto/eliminarfactura/"+codigofactura)
    .pipe(
      catchError(e =>"error")
    );
  }
  actualizarEliminar(response:any){
    alert("Factura eliminado exitosamente");
    this.buscarFactura();
  }

//generacion reporte estadistico tentativo borrar
  generarInformePDF() {
    // Obtener el contenido del Canvas
    const canvas = document.getElementById('grafico') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error('No se pudo obtener el contexto del lienzo');
      return;
    }

    // Verificar si el gráfico ya se ha generado
    if (!this.facturas || this.facturas.length === 0) {
      console.error('No hay datos para generar el informe PDF');
      return;
    }

    // Dibujar el gráfico en el Canvas
    const labels = this.facturas.map(factura => factura.codigofactura.toString());
    const data = this.facturas.map(factura => factura.total);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total por Factura',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Verificar si el Canvas tiene datos
    if (canvas.toDataURL('image/png') === 'data:,') {
      console.error('El Canvas no tiene datos para generar el informe PDF');
      return;
    }

    // Crear un nuevo objeto jsPDF
    const doc = new jsPDF();

    // Convertir el Canvas a una imagen base64
    const imgData = canvas.toDataURL('image/png');

    // Agregar la imagen al documento PDF
    doc.addImage(imgData, 'PNG', 10, 10, 180, 80);

    // Guardar el archivo PDF
    doc.save('informe.pdf');
  }


}
