import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseURL = 'https://junction-planreview.azurewebsites.net/'

  constructor(private http: HttpClient) { }

  getPatients() {     
    return this.http.get(this.baseURL + 'api/patients')
  }
}
