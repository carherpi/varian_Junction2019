import { Component, OnInit,  Input } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-two-dimensional-image',
  templateUrl: './two-dimensional-image.component.html',
  styleUrls: ['./two-dimensional-image.component.scss']
})
export class TwoDimensionalImageComponent implements OnInit {

  @Input() patient: any
  @Input() plan: any
  value: any 

  minValue: any;
  maxValue: any;


  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {

    /*
    this.patient = 'Head_Neck'
    this.plan = 'JSu-IM101'
    */
    this.value = '1'
    this.minValue = '1'
    this.maxValue = '100'
    console.log("data:")
    console.log(this.patient)
    console.log(this.plan)

  }

  

}
