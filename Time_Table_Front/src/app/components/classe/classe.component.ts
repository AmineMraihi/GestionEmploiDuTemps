import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Classe} from '../../models/classe';
import {ClasseService} from '../../services/classe.service';
import {decoratorArgument} from 'codelyzer/util/astQuery';
import {ifTrue} from 'codelyzer/util/function';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {

  constructor(private classeService: ClasseService) {
  }

  classe: Classe = new Classe();
  test: Classe = new Classe();
  public classes;

  ngOnInit() {
    this.fillClasses();
  }

  addClasse(): void {
    console.log(this.classe.nbetudiants);
    this.classeService.createClasse(this.classe).subscribe(
      data => {
        this.classe.name = '';
        this.classe.nbetudiants = null;
        this.fillClasses();
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }

  fillClasses() {
    console.log(this.classes);
    this.classeService.getClasses().subscribe(
      data => {
        this.classes = data;
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }

  deleteClasse(classe) {
    console.log(classe.id);
    this.classeService.deleteClasse(classe.id).subscribe(
      data => {
        this.fillClasses();
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }

  updateClasse() {
    console.log(this.classe);
    this.classeService.updateClasse(this.classe).subscribe(
      data => {
        this.classe.name = '';
        this.classe.nbetudiants = null;
        this.fillClasses();
        return true;
      }, error1 => {
        return Observable.throw(error1);
      }
    );
  }

  remplirChamps(classe) {
    this.classe.id = classe.id;
    this.classe.name = classe.name;
    this.classe.nbetudiants = classe.nbetudiants;
  }
  verifierClasseName (classe): Boolean {
    this.classeService.verifierName(classe.name).subscribe(
      data => {
        if (data instanceof Classe) {
          this.test = data;
        }
      }
    );
    console.log(this.test);
    if (this.test === null) {
      return false;
    } else {
      return true;
    }
  }
}
