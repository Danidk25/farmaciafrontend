import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  proveedor:any ={};
  proveedores: any =[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.buscarCliente();
  }

  //buscar clientes
  buscarCliente(){
    this.buscarClienteServicio().subscribe(
      (response:any) => this.proveedores = response
    )
  }
  buscarClienteServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bproveedor")
    .pipe(
      catchError(e => "error")
    );
  }
  //buscar clientes de forma ascendente
  buscarClienteAs(){
    this.buscarClienteAsServicio().subscribe(
      (response:any) => this.proveedores = response
    )
  }
  buscarClienteAsServicio():Observable<any>{
    return this.http.get<any>("http://localhost:8080/proyecto/bproveedorasc")
    .pipe(
      catchError(e => "error")
    );
  }


    //crear clientes login


    crearUsuario(){
      let formFormulario:any = document.getElementById("formProveedor");
      let formValido:boolean = formFormulario.reportValidity();
      if(formValido){
        this.crearClienteServicio().subscribe(
          (response:any) => this.actualizar(response)
        )
      }
    }


    crearClienteServicio(){

      var httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':'application/json'
        })
      }
      return this.http.post<any>("http://localhost:8080/proyecto/aproveedor",this.proveedor,httpOptions)
      .pipe(
        catchError(e =>"error")
      );
    }
    //modificacion de clientes Login
  actualizar(proveedor:any){
    alert("Cliente guardado exitosamente con el id: "+ proveedor.codigoproveedor);
    this.buscarCliente();
    this.proveedor = {};
  }

  Limpiar(){
    this.proveedor = {};
  }

  modificar(u:any){
    this.proveedor =u;
  }

  //eliminacion de clientes
  Eliminar(u:any){
    this.eliminarClienteServicio(u.codigoproveedor).subscribe(
      (response:any) => this.actualizarEliminar(response)
    )
  }

  eliminarClienteServicio(codigoproveedor:any){
    return this.http.delete<any>("http://localhost:8080/proyecto/eliminarprov/"+codigoproveedor)
    .pipe(
      catchError(e =>"error")
    );
  }
  actualizarEliminar(response:any){
    alert("Cliente eliminado exitosamente");
    this.buscarClienteAs();
  }


  generarInformePDF() {
    const doc = new jsPDF();
    const fontSize = 12;
    const lineHeight = 15;

    // Configuración del título
    doc.setFontSize(fontSize + 4);
    doc.text('Informe de Proveedores', 20, 20);

    // Configuración de las columnas
    doc.setFontSize(fontSize);
    const columnX1 = 20;
    const columnX2 = 30;
    const columnX3 = 70;
    const columnX4 = 100;
    const columnX5 = 130;


    // Obtén los datos de la tabla y agrégalos al informe
    const proveedores = this.proveedores;
    let y = 40;

    // Encabezados de columna
    doc.text('ID', columnX1, y);
    doc.text('Nombre', columnX2, y);
    doc.text('Apellido', columnX3, y);
    doc.text('nit', columnX4, y);
    doc.text('Telefono', columnX5, y);

    y += lineHeight;

    for (const proveedor of proveedores) {
      doc.text(proveedor.codigoproveedor.toString(), columnX1, y);
      doc.text(proveedor.primernombre, columnX2, y);
      doc.text(proveedor.primerapellido, columnX3, y);
      doc.text(proveedor.nit.toString(), columnX4, y);
      doc.text(proveedor.numerotelefono.toString(), columnX5, y);
      y += lineHeight;
    }


    // Guarda el informe como un archivo PDF
    doc.save('informe_proveedores.pdf');
  }

}
