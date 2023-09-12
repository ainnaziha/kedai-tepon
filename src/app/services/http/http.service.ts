import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor( 
    private http: HttpClient 
    ) { } 

    public get(url: string, options?: any) { 
      return this.http.get(`${environment.apiBaseUrl}/api/${url}`, options); 
    }

    public post(url: string, data: any, options?: any) { 
      return this.http.post(`${environment.apiBaseUrl}/api/${url}`, data, options); 
    } 

    public put(url: string, data: any, options?: any) { 
      return this.http.put(`${environment.apiBaseUrl}/api/${url}`, data, options); 
    } 

    public delete(url: string, options?: any) { 
      return this.http.delete(`${environment.apiBaseUrl}/api/${url}`, options); 
    } 
}
