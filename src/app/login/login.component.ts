import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:any = {};



  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    let formFormulario:any = document.getElementById("formUsuario");
    let formValido:boolean = formFormulario.reportValidity();
    if(formValido){
      this.iniciarSesionServicio().subscribe(
        (response:any) => this.redirigir(response)
      )
    }
  }

  iniciarSesionServicio(){

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    return this.http.post<any>("http://localhost:8080/proyecto/loginul",this.usuario,httpOptions)
    .pipe(
      catchError(e =>"error")
    );
  }

  redirigir(usuario:any){
    if(usuario){
      sessionStorage.setItem("usuario",JSON.stringify(usuario));

      location.href = "/pagina";
    }
    else{
      alert("Usuario o Password invalido.")
    }

  }


}
