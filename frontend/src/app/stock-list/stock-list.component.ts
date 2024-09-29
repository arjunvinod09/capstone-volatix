import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { Stock } from '../stock.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {

  stocks: Stock[] = [];

  userDetails: any;

  dropdownOpen = false; // Add this line
  isDropdownVisible = false;
  showUserDetailsDialog: boolean = false;  // Variable to control the dialog visibility

  constructor(private stockService: StockService, private router : Router, private userService: UserService) { }

  ngOnInit(): void {
      this.stockService.getAllStocks().subscribe(data => {
          this.stocks = data;
      });
  }

  viewStockDetails(id: string): void {
    this.router.navigate(['/stock', id]);
  }

      // Toggle dropdown function
      toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
      }
  
       // Logout function
    logout(): void {
      sessionStorage.clear(); // Clear session storage or any other logout logic
      this.router.navigate(['/login']); // Navigate to the login page or wherever needed
    }
  
    // viewUserDetails function
    viewUserDetails(): void {
      this.isDropdownVisible = false;
      this.router.navigate(['/user-details']);
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
