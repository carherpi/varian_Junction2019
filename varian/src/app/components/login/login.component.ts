import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: String
  password: String

  constructor(private router: Router) { }

  ngOnInit() {
  }


  loginSubmit(form: NgForm) {
    
    if (this.password == "123456" && this.email == "Doc") {
      console.log(form)
      console.log("Succesful login");
      this.router.navigate(['/dashboard'])  
    } else {
      console.log("Wrong password or username");
    }

      
  }

}
