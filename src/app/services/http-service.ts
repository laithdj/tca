import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  public get(url: string, params?: HttpParams): Observable<any> {
    if (params) {
      return this.httpClient.get(url, { params });
    }
    else {
      return this.httpClient.get(url);
    }
  }

  public getWithOptions(url: string, options: any): Observable<any> {
    return this.httpClient.get(url, options);
  }

  public put(url: string, body: any): Observable<any> {
    return this.httpClient.put(url, body);
  }

  public post<Model>(url: string, body: any, headers?: any): Observable<any> {
    return this.httpClient.post<Model>(url, body, { headers: headers });
  }

  public postWithOptions<Model>(url: string, body: any, options?: any): Observable<any> {
    return this.httpClient.post<Model>(url, body, options);
  }

  public delete(url: string): Observable<any> {
    return this.httpClient.delete(url);
  }
}
