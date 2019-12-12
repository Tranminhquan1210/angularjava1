import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  deleteUsers() {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) { }

  getUserById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/user/${id}`);
  }

  getUsers(): Observable<User[]> {
    // return this.http.get<User[]>(`${environment.apiUrl}/users`);

    return this.http.get<User[]>(`${environment.apiUrl}/users`)
      .pipe(
        tap(user => console.log('fetched users')),
        catchError(this.handleError('getUsers', []))
      );
  }
  postUser(user) {
    return this.http.post<any>(`${environment.apiUrl}/user`, user)
    .pipe(
      catchError(this.handleError('addHero', user))
    );
  }

  deleteUserById(id: number) {
    return this.http.post<any>(`${environment.apiUrl}/user/${id}`,id)
    .pipe(
      catchError(this.handleError('deleteUsers'))
    );
  }

  updateUserById(id: number, userdetail: any) {
    var url = `${environment.apiUrl}/users/${id}`;
    return this.http.post<any>(url, userdetail)
    .pipe(
      catchError(this.handleError('updateUsers'))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
