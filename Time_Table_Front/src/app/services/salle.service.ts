import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Classe} from '../models/classe';
import {Salle} from '../models/salle';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable()
export class SalleService {

  constructor(private http: HttpClient) { }
  getSalles() {
    return this.http.get('/server/salle');
  }
   createSalle(salle: Salle) {
    const body = JSON.stringify(salle);
    return this.http.post('/server/salle', body, httpOptions);
  }
  updateSalle(salle: Salle) {
    let body = JSON.stringify(salle);
    return this.http.put('/server/salle/update/' + salle.id, body, httpOptions);
  }
  deleteSalle(id: Number) {
    return this.http.delete('/server/salle/deleteSalle/' + id, httpOptions);
  }
  getSallesDispo(dateDebut: String, dateFin: String ){
    return this.http.get('server/salle/listeSalle/' + dateDebut +'/' +dateFin, httpOptions);
  }
}
