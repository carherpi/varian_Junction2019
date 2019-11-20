import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {



  username = "email@remov.ed"
  password = "testjunction1"

  number: String
  textMessage: String

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  sendMessage(form) {    
    
    var options = {
      phone: "+66666666666",
      message: this.textMessage
    }

    console.log(options)

    this.http.post('https://us-central1-stunning-agency-259219.cloudfunctions.net/Junction2019-Varian', options )
      .subscribe(res => {
        console.log(res)
      })
  }

}
