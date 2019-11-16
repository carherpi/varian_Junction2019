import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.scss']
})
export class PatientInfoComponent implements OnInit {

  @Input() patient: any

  constructor() { }

  ngOnInit() {
  }

}
