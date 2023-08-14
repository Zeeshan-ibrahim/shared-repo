import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/User';
import { Patient } from '../models/patient';
import { Case } from '../models/case';
import { Appoint } from '../models/appoint';

import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000';

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId: Pick<User, 'id'>;
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  signup(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(`${this.url}/auth/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('signup'))
      );
  }
  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<{
    token: string;
    userId: Pick<User, 'id'>;
  }> {
    return this.http
      .post<{ token: string; userId: Pick<User, 'id'> }>(
        `${this.url}/auth/login`,
        { email: email, password: password },
        this.httpOptions
      )
      .pipe(
        first(),
        tap((tokenObject: any) => {
          if (tokenObject && tokenObject.token && tokenObject.userId) {
            this.userId = tokenObject.userId;
            localStorage.setItem('token', tokenObject.token);
            this.isUserLoggedIn$.next(true);
            this.router.navigate(['/patient']); // Ensure the route starts with a slash
          } else {
            console.error('Invalid server response format');
          }
        }),
        catchError(
          this.errorHandlerService.handleError<{
            token: string;
            userId: Pick<User, 'id'>;
          }>('login')
        )
      );
  }
  patient(patient: Omit<Patient, 'id'>): Observable<Patient> {
    return this.http
      .post<Patient>(`${this.url}/patients/add`, patient, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Patient>('patient'))
      );
  }
  getAllPatients(): Observable<Patient[]> {
    console.log('working');
    return this.http
      .get<Patient[]>(`${this.url}/patients/all`, this.httpOptions) // Change the return type here too
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Patient[]>('getAllPatients')
        )
      );
  }
  case(info: Omit<Case, 'id'>): Observable<Case> {
    return this.http
      .post<Case>(`${this.url}/cases/add`, info, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Case>('case'))
      );
  }
  // appoint(data): Observable<Appoint> {
  //   return this.http
  //     .post<Appoint>(`${this.url}/appoint`, data, this.httpOptions)
  //     .pipe(
  //       first(),
  //       catchError(this.errorHandlerService.handleError<Appoint>('appoint'))
  //     );
  // }
}
