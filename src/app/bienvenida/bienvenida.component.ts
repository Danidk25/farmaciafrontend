import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  usuario:any = {};
  rol:any={};
  rolbol: boolean= false;
  constructor() { }


  ngOnInit(): void {
    let a= sessionStorage.getItem("usuario");
    if(a){
      this.usuario = JSON.parse(a);
    }
    else{
      location.href = "/"
    }



  }

 

  cerrarSesion(){
    //localStorage.clear();
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("rol");
    location.href = "/"
  }

}
