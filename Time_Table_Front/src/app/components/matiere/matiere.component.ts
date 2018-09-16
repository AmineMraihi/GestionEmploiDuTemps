import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Matiere} from '../../models/matiere';
import {MatiereService} from '../../services/matiere.service';
import {decoratorArgument} from 'codelyzer/util/astQuery';
import {ifTrue} from 'codelyzer/util/function';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {

  constructor(private matiereService: MatiereService) {
  }

  matiere: Matiere = new Matiere();
  test: Matiere = new Matiere();
  public matieres;

  ngOnInit() {
    this.fillMatieres();
  }

  addMatiere(): void {
    console.log(this.matiere.coefficient);
    this.matiereService.createMatiere(this.matiere).subscribe(
      data => {
        this.matiere.name = '';
        this.matiere.coefficient = null;
        this.fillMatieres();
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }

  fillMatieres() {
    this.matiereService.getMatieres().subscribe(
      data => {
        this.matieres = data;
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }

  deleteMatiere(matiere) {
    console.log(matiere.id);
    this.matiereService.deleteMatiere(matiere.id).subscribe(
      data => {
        this.fillMatieres();
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }

  updateMatiere() {
    console.log(this.matiere);
    this.matiereService.updateMatiere(this.matiere).subscribe(
      data => {
        this.matiere.name = '';
        this.matiere.coefficient = null;
        this.fillMatieres();
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }

  remplirChamps(matiere) {
    this.matiere.id = matiere.id;
    this.matiere.name = matiere.name;
    this.matiere.coefficient = matiere.coefficient;
  }


}
