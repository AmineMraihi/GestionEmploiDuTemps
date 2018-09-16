import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Classe} from '../models/classe';
import { Observable } from 'rxjs/Observable';
import {Seance} from '../models/seance';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable()
export class ClasseService {

  constructor(private http: HttpClient) { }
  getClasses() {
    return this.http.get('/server/classe');
  }
  createClasse(classe: Classe) {
    const body = JSON.stringify(classe);
    return this.http.post('/server/classe', body, httpOptions);
  }
  updateClasse(classe: Classe) {
    let body = JSON.stringify(classe);
    return this.http.put('/server/classe/update/' + classe.id, body, httpOptions);
  }
  deleteClasse(id: Number) {
    return this.http.delete('/server/classe/deleteClasse/' + id, httpOptions);
  }
  verifierName(name: String) {
    return this.http.get('/server/classe/existe/' + name, httpOptions);
  }
}
