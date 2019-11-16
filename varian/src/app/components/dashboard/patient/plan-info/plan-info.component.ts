import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-plan-info',
  templateUrl: './plan-info.component.html',
  styleUrls: ['./plan-info.component.scss']
})
export class PlanInfoComponent implements OnInit {


  @Input() plan: any

  constructor() { }

  ngOnInit() {
  }

}
