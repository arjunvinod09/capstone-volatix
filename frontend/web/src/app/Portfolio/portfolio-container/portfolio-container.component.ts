import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../portfolio-service';
import { Portfolio } from '../../../portfolio.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddPortfolioComponent } from '../add-portfolio/add-portfolio.component';
import { DeletePortfolioComponent } from '../delete-portfolio/delete-portfolio.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@Component({
  standalone: true,
  selector: 'app-portfolio-container',
  templateUrl: './portfolio-container.component.html',
  styleUrls: ['./portfolio-container.component.css'],
imports: [MatDialogModule, RouterLink, CommonModule, FormsModule,
            MatIconModule, RouterOutlet, MatListModule]
})
export class PortfolioContainerComponent implements OnInit {
  portfolios: Portfolio[] = [];
  isPortfolioAdded = false;
  selectedIndex = -1;
  userId: string;
  isSmallScreen = false;

  constructor(
    private portfolioService: PortfolioService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {
    this.userId = sessionStorage.getItem('userId') || '';
  }

  ngOnInit(): void {
    this.getAllPortfolios();
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  }

  getAllPortfolios(): void {
    this.portfolioService.getAllPortfolios(this.userId).subscribe(
      (response: Portfolio[]) => {
        this.portfolios = response;
      },
      (error) => {
        console.error('Error fetching portfolios:', error);
      }
    );
  }

  // handleListItemClick(index: number): void {
  //   this.selectedIndex = index;
  // }

  handleListItemClick(index: number): void {
    this.selectedIndex = index;
    const selectedPortfolio = this.portfolios[index];

  }

  openAddPortfolioDialog(): void {
    const dialogRef = this.dialog.open(AddPortfolioComponent, {
      width: '400px',
      data: { type: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isPortfolioAdded = !this.isPortfolioAdded;
        this.getAllPortfolios();
      }
    });
  }

  openEditPortfolioDialog(portfolio: Portfolio): void {
    const dialogRef = this.dialog.open(AddPortfolioComponent, {
      width: '400px',
      data: { type: 'edit', portfolio: portfolio }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isPortfolioAdded = !this.isPortfolioAdded;
        this.getAllPortfolios();
      }
    });
  }

  openDeletePortfolioDialog(portfolioId: string): void {
    const dialogRef = this.dialog.open(DeletePortfolioComponent, {
      width: '400px',
      data: { portfolioId: portfolioId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isPortfolioAdded = !this.isPortfolioAdded;
        this.getAllPortfolios();
        this.selectedIndex = -1;
      }
    });
  }
}
