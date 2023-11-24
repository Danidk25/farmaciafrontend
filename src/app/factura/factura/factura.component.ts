import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  factura:any = {};
  facturas:any = [];

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscarFactura();
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
}
