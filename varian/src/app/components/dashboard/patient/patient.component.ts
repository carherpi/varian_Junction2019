import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patients : string[] = [];
  patient: string;
  patientInfo: any;

  plans : string[] = [];
  plan: string; 
  planInfo: any; 

  value:any;

  rederedBitmaps: any[];
  

  constructor(
    private apiService: ApiServiceService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.apiService.getPatients()
      .subscribe(res => {
        for(var i in res) {
          this.patients.push(res[i]);
        }       
    }); 
    
  }

  updatePlans() {
    this.apiService.getPatient(this.patient)
      .subscribe(res => { 
        this.patientInfo = res     
    }); 
    this.apiService.getPatientPlans(this.patient)
      .subscribe(res => { 
        this.plans = []
        for(var i in res) {
          this.plans.push(res[i]);
        }       
    });
  }


  getAllImages() {
    /*
    this.rederedBitmaps = []

    var baseURL = 'https://junction-planreview.azurewebsites.net/'

    while (true) {
      this.http.get(baseURL + 'api/patients/{{patient}}/plans/{{plan}}/RenderedBitmaps/{{value}}')
        .subscribe(res => { 
          this.rederedBitmaps.push(res);   
      });
    }
    */
 
  }

}
