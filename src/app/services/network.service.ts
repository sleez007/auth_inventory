import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  private apiUrl = "http://localhost:3000/api/v1/";

  getRequest<T>(path: String, isAuthenticated: boolean = false): Observable<T>{

   
    const headers = this.createHeaders(isAuthenticated == true ? {authorization: localStorage.getItem('token')} : {})


    const url = this.apiUrl + path;
    return this.http.get<T>(url, headers).pipe(retry(3))
  }

  postRequest<T>(path: string, body: any, isAuthenticated: boolean = false): Observable<T>{
    const url = this.apiUrl + path;
    const headers = this.createHeaders(isAuthenticated ? {authorization: localStorage.getItem('token')}: {})
    return this.http.post<T>(url, body, headers);
  }

  updateRequest<T>(path: string, body: any): Observable<T>{
    const url = this.apiUrl + path;
    return this.http.put<T>(url, body)
  }

  deleteRequest<T>(path: String, queryParam: any): Observable<T>{
    const url = this.apiUrl + path + queryParam;
    return this.http.delete<T>(url).pipe(retry(3))
  }

  private createHeaders(obj: any= {}){
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json', ...obj})
    }
  }
}
