// import { Component } from '@angular/core';
// import { UserService } from '../user.service';
// import { User } from '../user.model';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';



// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [FormsModule,RouterLink, CommonModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {
//   user: User = {};

//   constructor(private userService: UserService, private router: Router) { }

//   register() {
//     console.log('Registering user:', this.user);
//     this.userService.registerUser(this.user).subscribe({
//       next: (response) => {
//         console.log('User registered successfully:', response);
//         this.router.navigate(['/login']);  // Navigate to login after successful registration
//       },
//       error: (error) => {
//         console.error('Error registering user:', error);
//       }
//     });
//   }

// navigateToFeature(feature: string) {
//     Navigate to the route based on the feature parameter
//     this.router.navigate([`/${feature}`]);
//   }
//  }

import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {};
  emailError: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  validateUser(): boolean {
    // Username: Non-empty, minimum length of 3 characters
    const usernameValid = !!(this.user.username && this.user.username.length >= 3);
    
    // Password: Non-empty, minimum length of 6 characters
    const passwordValid = !!(this.user.password && this.user.password.length >= 6);
    
    // Email: Must match a valid email format
    this.emailError = !this.user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.user.email);
    const emailValid = !this.emailError;
    
    // First Name: Non-empty
    const firstNameValid = !!(this.user.firstName && this.user.firstName.trim().length > 0);
    
    // Last Name: Non-empty
    const lastNameValid = !!(this.user.lastName && this.user.lastName.trim().length > 0);
    
    // Date of Birth: Non-empty and must be a valid date
    const dateOfBirthString = this.user.dateOfBirth; // Assume it's a string from the form input
    const dateOfBirthValid = !!(dateOfBirthString && !isNaN(new Date(dateOfBirthString).getTime()));
    
    // Address: Non-empty
    const addressValid = !!(this.user.address && this.user.address.trim().length > 0);
    
    // Phone Number: Must match the specified pattern
     const phoneNumberValid = !! this.user.phoneNumber && /^(?:\+91-?\d{10}|\d{10})$/.test(this.user.phoneNumber);
   
    
    
    // Profile Picture URL: Must be a valid URL
    const profilePictureUrlValid = !!(this.user.profilePictureUrl && /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(this.user.profilePictureUrl));
    
    // Check if all fields are valid
    return usernameValid && passwordValid && emailValid && firstNameValid && lastNameValid &&
           dateOfBirthValid && addressValid && phoneNumberValid && profilePictureUrlValid;
  }

  register() {
    if (this.validateUser()) {
      console.log('Registering user:', this.user);
      this.userService.registerUser(this.user).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']);  // Navigate to login after successful registration
        },
        error: (error) => {
          console.error('Error registering user:', error);
        }
      });
    } else {
      console.error('Validation failed. Please correct the errors.');
    }
  }
}



