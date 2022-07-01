import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:3000/";

  getRequest<T>(path: String): Observable<T>{
    const url = this.apiUrl + path;
    return this.http.get<T>(url).pipe(retry(3))
  }

  postRequest<T>(path: string, body: any): Observable<T>{
    const url = this.apiUrl + path;
    return this.http.post<T>(url, body, httpOptions)
  }

  updateRequest<T>(path: string, body: any): Observable<T>{
    const url = this.apiUrl + path;
    return this.http.put<T>(url, body)
  }

  deleteRequest<T>(path: String, queryParam: any): Observable<T>{
    const url = this.apiUrl + path + queryParam;
    return this.http.delete<T>(url).pipe(retry(3))
  }
}
