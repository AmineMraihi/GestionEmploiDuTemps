import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Seance} from '../models/seance';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class SeanceService {

  constructor(private http: HttpClient) {
  }

  getSeances() {
    return this.http.get('/server/seances');
  }

  createSeance(seance: Seance) {
    let body = JSON.stringify(seance);
    return this.http.post('/server/seances', body, httpOptions);
  }

  updateSeance(seance: Seance) {
    let body = JSON.stringify(seance);
    return this.http.put('/server/seances/seance', body, httpOptions);
  }

  deleteSeance(id: Number) {
    return this.http.delete('/server/seances/seance/' + id, httpOptions);
  }

}

