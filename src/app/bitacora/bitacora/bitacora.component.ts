import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, timestamp} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

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


}
