import { Component, OnInit, Inject } from '@angular/core';

import {MAT_DIALOG_DATA} from '@angular/material'

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialogpopup',
  templateUrl: './dialogpopup.component.html',
  styleUrls: ['./dialogpopup.component.scss']
})
export class DialogpopupComponent implements OnInit {


  number: String
  textMessage: String

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Important in the constructor
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  
  sendMessage(form) {    
    
    var options = {
      phone: "+34600345916",
      message: this.textMessage
    }

    console.log(options)

    this.http.post('https://us-central1-stunning-agency-259219.cloudfunctions.net/Junction2019-Varian', options )
      .subscribe(res => {
        console.log(res)
      })
  }

}
