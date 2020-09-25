import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { User } from './../models/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/registredUsers/';

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  createUser(model: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, model);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + userId);
  }

  editUser(userId: string | number, changes: Partial<User>): Observable<User> {
    return this.http.put<User>(this.baseUrl + userId, changes);
  }

  deleteUser(userId: string) {
    return this.http.delete(this.baseUrl + userId);
  }
}
