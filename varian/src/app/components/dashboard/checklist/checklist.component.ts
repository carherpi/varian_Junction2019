import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

toCheck1 = ['Area','Distance']//DVH
toCheck2 = ['Nominal','Perturbed']//Dose Location
notes = ['Plan 3 seems the most appropiate']

  constructor() { }

  ngOnInit() {
  }

}
