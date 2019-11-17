import { Component, OnInit } from '@angular/core';

import { DialogpopupComponent } from '../dialogpopup/dialogpopup.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

toCheck1 = ['Area','Distance']//DVH
toCheck2 = ['Nominal','Perturbed']//Dose Location
notes = ['Plan 3 seems the most appropiate']

popupDialog : MatDialogRef<DialogpopupComponent>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this.popupDialog = this.dialog.open(DialogpopupComponent, {
      width: 'auto',
      data : { }
    });
    this.popupDialog.afterClosed().subscribe(result => {
      console.log('The POPUP was closed');
      this.ngOnInit() // Reload view
    });
  }

}
