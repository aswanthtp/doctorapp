import { Component, OnInit } from '@angular/core';
import { Doctor } from '../doctor';
import { DoctorserviceService } from '../services/doctorservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

    doctors:Doctor[];
    posts:any;
    doctor:Doctor=new Doctor();

    constructor(private service:DoctorserviceService){
      this.doctors = [];
    }
    
   ngOnInit(): void {
     this.service.getDoctors()
     .subscribe(response=>{this.posts=response;
      // console.log(response);
      
      for(let i=0;i<this.posts.length;i++){
      this.doctor=new Doctor();
      this.doctor['doctorId']=this.posts[i]['doctorId'];
      this.doctor['fullName']=this.posts[i]['fullName'];
      this.doctor['specialising']=this.posts[i]['specialising'];
      this.doctor['location']=this.posts[i]['location'];
      this.doctors.push(this.doctor);
      console.log(this.doctors);


      }
     })
   }



  }









  //  doctors = [
  //   {
  //     name: "Dr. Jane Smith",
  //     specialization: "Pediatrics",
  //     location: "Los Angeles",
  //     rating: 4.8,
  //   },
  //   {
  //     name: "Dr. Jos Josh",
  //     specialization: "General",
  //     location: "New York",
  //     rating: 4.5,
  //   }

   
  // ];


