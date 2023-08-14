import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Patient } from 'src/app/models/patient';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  patients: Patient[] = [];
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.fetchPatients();
  }
  fetchPatients(): void {
    this.authService.getAllPatients().subscribe(
      (data) => {
        console.log('Showing Patients', data);
        this.patients = data; // Assign fetched data to the patients array
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  editPatient(patient: Patient): void {
    console.log('Edit patient:', patient);
  }

  deletePatient(patient: Patient): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete this patient?'
    );
    // if (confirmDelete) {
    //   this.authService.deletePatient(patient.id).subscribe(
    //     () => {
    //       console.log('Patient deleted successfully.');
    //       // After deleting the patient, fetch the updated patient list
    //       this.fetchPatients();
    //     },
    //     (error) => {
    //       console.error('Error:', error);
    //     }
    //   );
    // }
  }
}
