import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  administrador:any = {};

  constructor() { }

  ngOnInit(): void {
    let a= localStorage.getItem("administrador");
    if(a){
      this.administrador = JSON.parse(a);
    }
    else{
      location.href = "/"
    }
  }

  

  cerrarSesion(){
    localStorage.clear();
    //localStorage.removeItem("administrador");
    location.href = "/"
  }

}
