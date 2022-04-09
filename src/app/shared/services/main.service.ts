import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../interfaces/person/person.interface';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private url = 'http://localhost:3000/form'

  constructor(private http: HttpClient) { }

  getAll(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(this.url)
  }

  create(person: any): Observable<void> {
    return this.http.post<void>(this.url, person)
  }
}
