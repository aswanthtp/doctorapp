import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from '../login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: login = new login();

  loginForm: FormGroup;
  username: FormControl;
  password: FormControl;
  submitted = false;

  submitMessage: string;
  flag: boolean = false;

  constructor(private router:Router,public formBuilder: FormBuilder) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  redirectToRegister(event:Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

  get f() { return this.loginForm.controls; }
 
  loginSubmit(){
    if(this.loginForm.valid){
    console.log("hi from loginsubmit")
    this.login.username = this.loginForm.value.username;
    this.login.password = this.loginForm.value.password;
    console.log("Name " + this.login.username);
    console.log("Password" + this.login.password);
    }
  }

}

