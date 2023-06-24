import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorserviceService {

  constructor(private httpclient: HttpClient) { }

  getDoctors(): Observable<any>{
    
    return this.httpclient.get<Doctor[]>(`http://localhost:8000/doctors`);
  }

  addDoctor(doctor:Doctor):Observable<Doctor>{
    console.log(doctor.fullName);
    const url =`http://localhost:8000/doctors`;
    return this.httpclient.post<Doctor>(url,doctor);
  }

  updateDoctor(doctorId:number,doctor:Doctor):Observable<any>{
    const url=`http://localhost:8000/doctors/${doctorId}`;
    return this.httpclient.put(url,doctor);
  }

  deleteDoctor(doctorId:number):Observable<any>{
    const url=`http://localhost:8000/doctors/${doctorId}`;
    return this.httpclient.delete(url);
  }
}
