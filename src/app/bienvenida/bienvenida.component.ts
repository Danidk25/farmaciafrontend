import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  usuario:any = {};

  constructor() { }

  ngOnInit(): void {
    let a= localStorage.getItem("usuario");
    if(a){
      this.usuario = JSON.parse(a);
    }
    else{
      location.href = "/"
    }
  }



  cerrarSesion(){
    //localStorage.clear();
    localStorage.removeItem("usuario");
    location.href = "/"
  }

}
