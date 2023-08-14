import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { Patient } from 'src/app/models/patient';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  patientForm: FormGroup;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.patientForm = this.createFormGroup();
    this.fetchPatients();
  }
  createFormGroup(): FormGroup {
    const formGroupConfig = {
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      date_of_birth: new FormControl('', [Validators.required]),
      ssn: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      middle_name: new FormControl(''),
    };

    return new FormGroup(formGroupConfig);
  }
  addPatient() {
    console.log(this.patientForm.value);
    this.authService.patient(this.patientForm.value).subscribe((msg) => {
      console.log(msg);
      this.fetchPatients();
    });
    this.patientForm.reset();
    this.clearErrorStates();
  }
  clearErrorStates() {
    const formControls = this.patientForm.controls;
    Object.keys(formControls).forEach((controlName) => {
      const control = formControls[controlName];
      control.setErrors(null);
    });
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
    // Implement your edit logic here, e.g., route to an edit page with patient details
    // You can use the patient object to pass data to the edit page
    console.log('Edit patient:', patient);
    // For example, route to the edit page with patient ID
    // this.router.navigate(['/edit-patient', patient.id]);
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
