import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  usuario:any = {};

  datorol:any = {};
  rl:any={};
  rolbol: boolean= false;
  constructor() { }

  ngOnInit(): void {
    let a= sessionStorage.getItem("usuario");
    let b = sessionStorage.getItem("rol")
    if(a){
      this.usuario = JSON.parse(a);
    }
    else{
      location.href = "/"
    }
  }

  roles(){
    this.datorol = "administrador";
  this.rl= sessionStorage.getItem("rol");
    if(this.datorol= this.rl){
      this.rolbol = true;
    }else {
      this.rolbol = false;
    }

  }

  cerrarSesion(){
    //localStorage.clear();
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("rol");
    location.href = "/"
  }

}
