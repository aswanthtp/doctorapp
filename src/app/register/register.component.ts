import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { register } from '../register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,public formBuilder: FormBuilder){}
  register: register = new register();
  registerform:FormGroup;
  
  username: FormControl;
  email: FormControl;
  phoneNo:FormControl;
  password: FormControl;
  
  ngOnInit(): void {
    this.registerform = new FormGroup({

      username: new FormControl('', Validators.required),
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phoneNo: new FormControl('', [Validators.required,Validators.pattern("^[0-9]{10}$")]),
      password: new FormControl('', Validators.required)

      
    });
  }
  redirectToLogin(event:Event){
    event.preventDefault();
    this.router.navigate(['/login']);
  }
  get f() { return this.registerform.controls; }
  registerSubmit(){

    if(this.registerform.valid){
    console.log("Hi");
    this.register.username = this.registerform.value.username;
    console.log("username== " + this.registerform.value.username)
    this.register.email = this.registerform.value.email;
    console.log("email== " + this.registerform.value.email)
    this.register.phoneNo = this.registerform.value.phoneNo;
    console.log("phoneNo== " + this.registerform.value.phoneNo)
    this.register.password = this.registerform.value.password;
    console.log("password== " + this.registerform.value.password)
    
    
    }
  }

}
