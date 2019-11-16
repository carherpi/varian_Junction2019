import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {



  username = "kikoncius@gmail.com"
  password = "testjunction1"

  number: String
  textMessage: String

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  sendMessage(form) {    
    var postFields = {
      from:    "NodeElk",
      to:      "+34600345916",
      message: "Bring a sweater it's cold outside!"
    }

    //const key = new Buffer(this.username + ':' + this.password).toString('base64')
    const postData = JSON.stringify(postFields)

    const options = {
      hostname: 'api.46elks.com',
      path:     '/a1/SMS',
      method:   'POST',
      headers:  {
        //'Authorization': 'Basic ' + key
      }
    }

    this.http.post('https://api.46elks.com/a1/sms', { headers: options })
      .subscribe(res => {
        console.log(res)
      })
  }

}
