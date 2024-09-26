import { Component, Inject, Input, OnInit } from '@angular/core';
import { PortfolioService } from '../../portfolio-service';
import { Stock } from '../../stock.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortfolioBuySellContainerComponent } from '../portfolio-buy-sell-container/portfolio-buy-sell-container.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-portfolio-buy-sell-stock',
  standalone: true,
  imports: [FormsModule, CommonModule, FormsModule, MatDialogModule, MatTabsModule, PortfolioBuySellContainerComponent],
  templateUrl: './portfolio-buy-sell-stock.component.html',
  styleUrl: './portfolio-buy-sell-stock.component.css'
})
export class PortfolioBuySellStockComponent {
  @Input() type: string = '';
  @Input() portfolioId: string = '';
  @Input() stockId: string = '';
  @Input() stockName: string = '';
  @Input() currentPrice: number = 0;

  constructor(
    public dialogRef: MatDialogRef<PortfolioBuySellStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize inputs if data is provided
    if (data) {
      this.type = data.type;
      this.portfolioId = data.portfolioId;
      this.stockId = data.stockId;
      this.stockName = data.stockName;
      this.currentPrice = data.currentPrice;
    }
  }

  handleTabChange(event: any): void {
    this.type = event.index === 0 ? 'addMore' : 'remove';
  }

  closeDialog(status?: any): void {
    this.dialogRef.close(status);
  }
}