import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from '../../portfolio-service';
import { StockService } from '../../stock.service';
import { Portfolio, PortfolioStock } from '../../../portfolio.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PortfolioAlertComponent } from '../portfolio-alert/portfolio-alert.component';
import { Stock } from '../../stock.model';
import { PortfolioTransactionsComponent } from '../portfolio-transactions/portfolio-transactions.component';
 
@Component({
  selector: 'app-portfolio-buy-sell-container',
  standalone: true,
  imports: [CommonModule, PortfolioAlertComponent, MatIcon, MatSnackBarModule, MatListModule, FormsModule,PortfolioTransactionsComponent],
  templateUrl: './portfolio-buy-sell-container.component.html',
  styleUrls: ['./portfolio-buy-sell-container.component.css']
})
export class PortfolioBuySellContainerComponent implements OnInit {
  portfolioId!: string;
  portfolio: Portfolio | undefined;
  stocks: PortfolioStock[] = [];
  availableStocks: Stock[] = [];
  stockToBuy: Stock | undefined;
  stockToSell: PortfolioStock | undefined;
  quantityToBuy: number = 0;
  quantityToSell: number = 0;
  stockId!: string;
  stock1: Stock | undefined;
  selectedStock: PortfolioStock | null = null;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private stockService: StockService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.portfolioId = this.route.snapshot.paramMap.get('id')!;
    this.loadPortfolio();
    this.loadStockAll();
  }

  loadPortfolio(): void {
    this.portfolioService.getPortfolioById(this.portfolioId).subscribe(portfolio => {
      this.portfolio = portfolio;

      // Map backend response to PortfolioStock model
      this.stocks = (portfolio.stocks ?? []).filter(stock => stock.quantity >= 1)
        .map(stock => {
        const avgBuyPrice = stock.avgBuyPrice;
        const quantity = stock.quantity;
        // We'll set placeholders for currentPrice and priceChangePercentage24h and fetch them later
        const currentPrice = 0;
        const priceChangePercentage24h = 0;

        const totalCostBasis = avgBuyPrice * quantity;
        const holdings = quantity;
        const returns = currentPrice * quantity - totalCostBasis;

        return {
          stockId: stock.stockId,
          stockName: stock.stockName,
          stockSymbol: stock.stockSymbol,
          stockImage: stock.stockImage,
          currentPrice: currentPrice, // This will be updated later
          priceChangePercentage24h: priceChangePercentage24h, // To be updated
          holdings: holdings,
          avgBuyPrice: avgBuyPrice,
          returns: returns,
          quantity: quantity
        };
      });
      this.updateCurrentPrices();
    });
  }

  updateCurrentPrices(): void {
    // Fetch the latest prices for all stocks in the portfolio
    this.stocks.forEach(stock => {
      this.stockService.getStockById(stock.stockId).subscribe((data: Stock) => {
        // Update stock with real-time data from the StockService
        stock.currentPrice = data.current_price;
        stock.priceChangePercentage24h = data.price_change_percentage_24h;

        // Recalculate holdings and returns based on the updated current price
        const totalCostBasis = stock.avgBuyPrice * stock.quantity;
        const currentValue = stock.currentPrice * stock.quantity;
        stock.returns = currentValue - totalCostBasis;

        // Optionally log the recalculated values for debugging
        console.log(`Stock: ${stock.stockName}, Current Price: ${stock.currentPrice}, Returns: ${stock.returns}`);
      }, error => {
        console.error(`Error fetching stock data for ${stock.stockName}:`, error);
      });
    });
  }

  loadStockAll(): void {
    this.stockService.getAllStocks().subscribe(stocks => {
      this.availableStocks = stocks;
    });
  }

  addStock(): void {
    if (this.stockToBuy?.id && this.quantityToBuy > 0) {
      this.portfolioService.buyStock(this.portfolioId, this.stockToBuy.id, this.quantityToBuy)
        .subscribe(() => {
          this.loadPortfolio(); // Refresh the portfolio after buying
          this.quantityToBuy = 0; // Reset the quantity input
          alert('Stock purchased successfully!');
        });
    } else {
      alert('Please select a stock and enter a valid quantity.');
    }
  }

  sellStock(): void {
    if (this.stockToSell?.stockId && this.quantityToSell > 0) {
      this.portfolioService.sellStock(this.portfolioId, this.stockToSell.stockId, this.quantityToSell)
        .subscribe(() => {
          this.loadPortfolio(); // Refresh the portfolio after selling
          this.quantityToSell = 0; // Reset the quantity input
          alert('Stock sold successfully!');
        });
    } else {
      alert('Please select a stock and enter a valid quantity.');
    }
  }

  selectStock(stock: PortfolioStock): void {
    this.selectedStock = stock;
  }

  viewTransactions(stockId: string): void {
    if (this.portfolioId) {
      this.router.navigateByUrl(`transactions/${this.portfolioId}/${stockId}`);
    } else {
      console.error('Portfolio ID is not set');
    }
  }
}