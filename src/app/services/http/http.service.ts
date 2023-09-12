import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor( 
    private http: HttpClient 
    ) { } 

    private get header() : HttpHeaders {
      return new HttpHeaders({
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`,
      })
    }

    public get(url: string) { 
      return this.http.get(`${environment.apiBaseUrl}/api/${url}`, {'headers': this.header}); 
    }

    public post(url: string, data: any) { 
      return this.http.post(`${environment.apiBaseUrl}/api/${url}`, data, {'headers': this.header}); 
    } 

    public put(url: string, data: any) { 
      return this.http.put(`${environment.apiBaseUrl}/api/${url}`, data, {'headers': this.header}); 
    } 

    public delete(url: string) { 
      return this.http.delete(`${environment.apiBaseUrl}/api/${url}`, {'headers': this.header}); 
    } 
}
