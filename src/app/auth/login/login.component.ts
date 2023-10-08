import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = ''; 
  errorMessage: string = ''; 
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
      if (this.username && this.password) {
          this.authService.login(this.username, this.password).subscribe(
              () => {
                  console.log('Login successful');
                  this.successMessage = 'Logged in successfully!';
                  setTimeout(() => {
                      this.router.navigate(['/']); // redirects to homepage
                  }, 1500); // waits 1.5 seconds before redirecting
              },
              err => {
                  console.error('Login failed', err);
                  this.errorMessage = 'Login failed. Please check your credentials and try again.';
              }
          );
      }
  }
}