import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {
  cars = new Array();
  constructor() { }

  ngOnInit() {
    this.cars = [
      { vin: '123', year: '123', brand: '123', color: '123' },
      { vin: '123', year: '123', brand: '123', color: '123' },
      { vin: '123', year: '123', brand: '123', color: '123' },
      { vin: '123', year: '123', brand: '123', color: '123' },
      { vin: '123', year: '123', brand: '123', color: '123' },
      { vin: '123', year: '123', brand: '123', color: '123' },
    ];
  }

}
