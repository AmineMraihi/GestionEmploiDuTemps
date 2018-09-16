import { Injectable } from '@angular/core';
import {Matiere} from '../models/matiere';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable()
export class MatiereService {

  constructor(private http: HttpClient) { }
  getMatieres() {
    return this.http.get('/server/matiere');
  }
  createMatiere(matiere: Matiere) {
    const body = JSON.stringify(matiere);
    return this.http.post('/server/matiere', body, httpOptions);
  }
  updateMatiere(matiere: Matiere) {
    let body = JSON.stringify(matiere);
    return this.http.put('/server/matiere/update/' + matiere.id, body, httpOptions);
  }
  deleteMatiere(id: Number) {
    return this.http.delete('/server/matiere/deleteMatiere/' + id, httpOptions);
  }
  verifierName(name: String) {
    return this.http.get('/server/classe/existe/' + name, httpOptions);
  }
}
