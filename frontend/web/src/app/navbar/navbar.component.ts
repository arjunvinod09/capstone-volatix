import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = true;
  dropdownOpen = false; // Add this line
  isDropdownVisible = false;
  showUserDetailsDialog: boolean = false; 
  userDetails: any;


  constructor( private router: Router, private userService : UserService ){};

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      // Set showNavbar to false if the route is login or register
      this.showNavbar = !(currentRoute === '/login' || currentRoute === '/register');
    });
  }


  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToPortfolio() {
    this.router.navigate(['/portfolio']);
  }

  navigateToStocks() {
    this.router.navigate(['/stocks']);
  }

  navigateToNews() {
    this.router.navigate(['/news']);
  }

  navigateToUserDetails() {
    this.router.navigate(['/user-details']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToMarketTrends() {
    this.router.navigate(['/market-trends']);
  }

  navigateToMarketData() {
    this.router.navigate(['/market-data']);
  }

  navigateToPortfolioData() {
    this.router.navigate(['/portfolio-data']);
  }


  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  

  openUserDetailsDialog() {
    const userId = sessionStorage.getItem('userId');  // Retrieve the stored user ID
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (user: User) => {
          this.userDetails = user;  // Store fetched user details
          this.showUserDetailsDialog = true;  // Show the dialog
          console.log('User details fetched successfully:', user);
        },
        error: (error: any) => {
          console.error('Error fetching user details:', error);
        }
      });
    } else {
      console.error('User ID not found in session storage');
    }
  }


  closeUserDetailsDialog() {
    this.showUserDetailsDialog = false;  // Hide the dialog
    this.userDetails = null;  // Clear user details
  }


}
