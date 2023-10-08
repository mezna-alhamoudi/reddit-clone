// register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service'; // adjust the path to your service file
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    errorMessage: string = '';
    successMessage: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            this.errorMessage = 'Please correct the validation errors.';
            return;
        }

        const { username, email, password } = this.registerForm.value;

        this.authService.register(username, email, password).subscribe(
            () => {
                this.successMessage = 'Registration successful! Redirecting to login page...';
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 1500);
            },
            (err:any) => {
                this.errorMessage = 'Registration failed. Please ensure your details are correct and try again.';
            }
        );
    }
}
