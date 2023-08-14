import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators , AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm : FormGroup;

  constructor(private authService: AuthService){

  }

  ngOnInit(): void{
    this.registerForm = this.createFormGroup();
  }
  

  createFormGroup(): FormGroup{
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)]),
      confirmPassword: new FormControl("", [Validators.required, this.matchPasswordValidator('password')]),
    })
  }
  matchPasswordValidator(fieldToMatch: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const matchingControl = control.root.get(fieldToMatch);
      return matchingControl && control.value !== matchingControl.value ? { passwordMismatch: true } : null;
    };}
  register(){
      this.authService.signup(this.registerForm.value)
      .subscribe((msg) => console.log(msg)  )
      this.registerForm.reset();
      this.clearErrorStates();
  }
  clearErrorStates() {
    const formControls = this.registerForm.controls;
  
    Object.keys(formControls).forEach(controlName => {
      const control = formControls[controlName];
      control.setErrors(null);
    });
  }
}