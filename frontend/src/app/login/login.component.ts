import { Component } from '@angular/core';
import { LoginRequest } from '../login-request.model';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginRequest: LoginRequest = { email: '', password: '' };
  emailError: boolean = false;
  passwordError: boolean = false;
  loginError: string | null = null;
  userDetails: User | null = null;  // User details object to store fetched data

  constructor(private userService: UserService, private router: Router) {}

  validateInputs(): boolean {
    this.emailError = !this.loginRequest.email || !/^\S+@\S+\.\S+$/.test(this.loginRequest.email);
    this.passwordError = !this.loginRequest.password || this.loginRequest.password.length < 6;
    return !(this.emailError || this.passwordError);
  }

  login() {
    if (this.validateInputs()) {
      this.userService.login(this.loginRequest).subscribe({
        next: (userId) => {
          if (userId) {
            console.log('Login successful. User ID:', userId);
            sessionStorage.setItem('userId', userId); // Store user ID in sessionStorage
            this.router.navigate(['/dashboard']); // Redirect to dashboard
          } else {
            // this.loginError = 'Invalid email or password. Please try again.';
            console.error('Invalid email or password. Please try again.');
          }
        },
        error: (error) => {
          console.error('Error logging in:', error);
          this.loginError = 'An error occurred during login. Please try again later.';
        }
      });
    } else {
      this.loginError = 'Validation failed. Please enter a valid email and password.';
      console.error(this.loginError);
    }
  }

  fetchUserDetails() {
    const userId = sessionStorage.getItem('userId');  // Retrieve the stored user ID
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user: User) => {
          this.userDetails = user;  // Store fetched user details
          console.log('User details fetched successfully:', user);
        },
        error: (error: any) => {
          console.error('Error fetching user details:', error);
        }
      });
    }
  }
}

