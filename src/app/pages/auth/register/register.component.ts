import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(8)]],
      userConfirmPassword: ['', Validators.required], 
    });
  }

  signUp() {
    const password = this.registrationForm.get('userPassword').value;
    const confirm = this.registrationForm.get('userConfirmPassword').value;

    this.errorMessage = '';
    
    if (this.registrationForm.valid && password == confirm) {
      const name = this.registrationForm.get('userName').value;
      const email = this.registrationForm.get('userEmail').value;
      this.authService.SignUp(email, password, name);
    } else if (password != confirm) {
      this.errorMessage = 'Password do not match.';
    } else if (this.registrationForm.get('userPassword').hasError('minLength')) {
      this.errorMessage = 'Password must be at least 8 characters long.';
    }
  }
}