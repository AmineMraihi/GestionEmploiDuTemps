import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Salle} from '../models/salle';
import {Disponibilite} from '../models/Disponibilite';
import {Seance} from '../models/seance';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable()
export class DisponibiliteService {

  constructor(private http: HttpClient) {
  }
  getDisponibilite() {
    return this.http.get('/server/disponibilite');
  }
  createDisponibilite(seance: Seance) {
    const body = JSON.stringify(seance);
    return this.http.post('/server/disponibilite', body, httpOptions);
  }
}
