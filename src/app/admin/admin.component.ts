import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Doctor } from '../doctor';
import { DoctorserviceService } from '../services/doctorservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  posts:any;
  doctors: Doctor[];
  doctor: Doctor = new Doctor();
  adminForm:FormGroup;
  doctorId:FormGroup;
  fullName:FormControl;
  specialising:FormControl;
  location:FormControl;
  isEditing: { [key: string]: boolean } = {};

  constructor(private service:DoctorserviceService){

    this.doctors=[];
    this.adminForm=new FormGroup({
      fullName:new FormControl(),
      specialising:new FormControl(),
      location:new FormControl()
    })

  }



  ngOnInit(): void {

    this.service.getDoctors()
     .subscribe(response=>{this.posts=response;
      // console.log(response);
      
      for(let i=0;i<this.posts.length;i++){

      this.doctor=new Doctor();
      this.doctor.doctorId=this.posts[i]['doctorId'];
      console.log(this.doctor.doctorId);
      this.doctor.fullName=this.posts[i]['fullName'];
      console.log( this.doctor.fullName);
      this.doctor.specialising=this.posts[i]['specialising'];
      console.log(this.doctor.specialising);
      this.doctor.location=this.posts[i]['location'];  
      console.log(this.doctor.location);
      this.doctors.push(this.doctor);
      console.log(this.doctors);


      }
     })

    
  }
  
  addDoctor(){
    this.doctor =new Doctor();
    console.log("Hello");
    this.doctor.doctorId=0;
    this.doctor.fullName=this.adminForm.value.fullName;
    console.log(this.adminForm.value.specialising)
    // const specialisingValue = this.adminForm.value.specialising.trim(); // Remove leading and trailing spaces
    // this.doctor.specialising = specialisingValue ? specialisingValue.split(',') : [];
    this.doctor.specialising=this.adminForm.value.specialising;
    this.doctor.location=this.adminForm.value.location;
    this.service.addDoctor(this.doctor).subscribe(data => {
      console.log(data);
    },
    _err => console.log("Error"));
    window.location.reload();

  }

  updateDoctor(doctor:Doctor,doctorIndex: number) {

    doctor.fullName = doctor.fullName;
    doctor.specialising = doctor.specialising;
    doctor.location = doctor.location;
    this.service.updateDoctor(doctor.doctorId, doctor).subscribe(data => {
     console.log(data);
      alert("Doctor updated");
    });
    this.isEditing[doctorIndex] = false;
    window.location.reload();

  }

  deleteDoctor(index: number) {
    const deletedDoctor = this.doctors[index];
    this.service.deleteDoctor(deletedDoctor.doctorId).subscribe(() => {
    console.log("Doctor deleted");

      this.doctors.splice(index, 1);

      window.location.reload();

    });
 }

}
