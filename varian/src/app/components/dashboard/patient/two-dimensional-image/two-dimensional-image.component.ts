import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-two-dimensional-image',
  templateUrl: './two-dimensional-image.component.html',
  styleUrls: ['./two-dimensional-image.component.scss']
})
export class TwoDimensionalImageComponent implements OnInit {

  patient: any
  plan: any
  value: any 

  minValue: any;
  maxValue: any;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {

    this.patient = 'Head_Neck'
    this.plan = 'JSu-IM101'
    this.value = '40'

    this.minValue = '1'
    this.maxValue = '100'

  }

  

}
