import { Component, Input, OnInit,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { PortfolioService } from '../../portfolio-service';

export interface PortfolioTransaction {
  type: string;
  createdAt: number;
  quantity: number;
  amount: number;
}
 
@Component({
  selector: 'app-portfolio-transactions',
  standalone: true,
  templateUrl: './portfolio-transactions.component.html',
  styleUrls: ['./portfolio-transactions.component.css'],
  imports: [
    CommonModule, MatProgressSpinnerModule, MatPaginatorModule, MatTableModule, DatePipe
  ],
})
export class PortfolioTransactionsComponent implements OnInit {
 portfolioId!: string;
 stockId!: string;
  transactions: PortfolioTransaction[] = [];

  constructor(private portfolioService: PortfolioService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((data)=>{
      this.portfolioId = data.get('portfolioId')??"";
      this.stockId = data.get('stockId')??"";
    })
    if (this.portfolioId && this.stockId) {
      this.loadTransactions();
    }
  }

  loadTransactions(): void {
    this.portfolioService.getTransaction(this.portfolioId, this.stockId).subscribe(
      (response) => {
        // Extract the transactions array from the response
        this.transactions = response.transactionsDetailsList; // Adjusted to reflect the response structure
        console.log('Transactions:', this.transactions); // Check if transactions are logged correctly
      },
      (error) => {
        console.error('Error fetching transactions:', error);
      }
    );
  }
}