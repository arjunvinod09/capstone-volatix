import { Component, AfterViewInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Stock } from '../stock.model';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../stock.service';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js/auto';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';  // Import the UserService
import { User } from '../user.model';

@Component({
  selector: 'app-stock-detail',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css'],
})
export class StockDetailComponent implements AfterViewChecked {

  userDetails: any;

  dropdownOpen = false; // Add this line
  isDropdownVisible = false;
  showUserDetailsDialog: boolean = false;  // Variable to control the dialog visibility

  @ViewChild('stockChart', { static: false }) stockChartRef!: ElementRef;
  
  stock?: Stock;
  chartInitialized = false; // Flag to ensure chart is initialized only once

  constructor(private route: ActivatedRoute, private stockService: StockService, private router: Router, private userService: UserService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.stockService.getStockById(id).subscribe(stock => {
        this.stock = stock;
        console.log(this.stock.sparkline_in_7d);
      });
    }
  }

  ngAfterViewChecked(): void {
    if (this.stock && this.stock.sparkline_in_7d && !this.chartInitialized) {
      this.createChart(this.stock!.sparkline_in_7d.price);
      this.chartInitialized = true; // Mark the chart as initialized
    }
  }

  generateDateLabels() {
    const currentDate = new Date();
    const dateLabels = [];

    for (let i = 0; i < 168; i++) {
      const timestamp = new Date(currentDate.getTime() - i * 60 * 60 * 1000); 
      const formattedDate = timestamp.toLocaleString('default', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); // Format as "Oct 03 14:00"
      dateLabels.unshift(formattedDate);
    }

    return dateLabels;
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


  createChart(priceData: number[]): void {
    const canvas = this.stockChartRef?.nativeElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      console.log('Chart context initialized');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.generateDateLabels().map(value=>value), // Replace with actual time labels if available
          datasets: [{
            label: 'Price',
            data: priceData,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.1 // Smooth line
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time'
              },
              grid: {
                display: false
              }
            },
            y: {
              title: {
                display: true,
                text: 'Price (USD)'
              },
              grid: {
                color: '#f2f2f2'
              }
            }
          }
        }
      });
    } else {
      console.error('Chart context could not be initialized');
    }
  }
}

  
