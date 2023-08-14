import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})
export class CaseComponent {
  caseForm: FormGroup;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.caseForm = this.createCaseGroup();
  }
  createCaseGroup(): FormGroup {
    const formGroupConfig = {
      practiceLocation: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      purposeOfVisit: new FormControl('', [Validators.required]),
      caseType: new FormControl('', [Validators.required]),
      doa: new FormControl('', [Validators.required]),

      // Attributes for the Insurance section
      insuranceName: new FormControl('', [Validators.required]),
      insuranceCity: new FormControl('', [Validators.required]),
      insuranceState: new FormControl('', [Validators.required]),
      insuranceZip: new FormControl('', [Validators.required]),

      // Attributes for the Firm section
      firmName: new FormControl('', [Validators.required]),
      firmCity: new FormControl('', [Validators.required]),
      firmState: new FormControl('', [Validators.required]),
      firmZip: new FormControl('', [Validators.required]),
    };
    return new FormGroup(formGroupConfig);
  }
  addCase() {
    console.log(this.caseForm.value);
    this.authService
      .case(this.caseForm.value)
      .subscribe((msg) => console.log(msg));
    // this.caseForm.reset();
    // this.clearErrorStates();
  }
  clearErrorStates() {
    const formControls = this.caseForm.controls;
    Object.keys(formControls).forEach((controlName) => {
      const control = formControls[controlName];
      control.setErrors(null);
    });
  }
}
