import { Component, OnInit } from '@angular/core';
import {SalleService} from '../../services/salle.service';
import {Salle} from '../../models/salle';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {

  constructor(private salleService: SalleService) { }

  salle: Salle = new Salle();
  public salles;
  ngOnInit() {
    this.fillSalles();
  }
  addSalle(): void {
    console.log(this.salle.nbMax);
    this.salleService.createSalle(this.salle).subscribe(
      data => {
        this.salle.name = '';
        this.salle.nbMax = null;
        this.fillSalles();
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }
  fillSalles() {
    console.log(this.salles);
    this.salleService.getSalles().subscribe(
      data => {
        this.salles = data;
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }
  deleteSalle(salle) {
    console.log(salle.id);
    this.salleService.deleteSalle(salle.id).subscribe(
      data => {
        this.fillSalles();
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }
  updateSalle() {
    console.log(this.salle);
    this.salleService.updateSalle(this.salle).subscribe(
      data => {
        this.salle.name = '';
        this.salle.nbMax = null;
        this.fillSalles();
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }

  remplirChamps(salle) {
    this.salle.id = salle.id;
    this.salle.name = salle.name;
    this.salle.nbMax = salle.nbMax;
  }
}
