
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  fullName = '';
  email = '';
  phone = '';
  company = '';
  password = '';
  confirmPassword = '';

  submitted = false;
  errorMessage = '';

  onSubmit(form: NgForm): void {
    this.submitted = true;
    this.errorMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Please complete all required fields correctly.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Your passwords do not match.';
      return;
    }

    this.errorMessage =
      'Your details are valid, but registration is not connected to the API yet.';
  }
}
