import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patients : string[] = [];

  constructor(
    private apiService: ApiServiceService,
  ) { }

  ngOnInit() {

    this.apiService.getPatients()
      .subscribe(res => { 
        for(var i in res) {
          this.patients.push(res[i]);
        }       
    }); 
    
  }


}
