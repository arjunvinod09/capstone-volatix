import { Component } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app.routes';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RegisterComponent } from './register/register.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { MarketTrendsComponent } from './market-trends/market-trends.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
import { PortfolioContainerComponent } from './Portfolio/portfolio-container/portfolio-container.component';
import { PortfolioAlertComponent } from './Portfolio/portfolio-alert/portfolio-alert.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { PortfolioTransactionsComponent } from "./Portfolio/portfolio-transactions/portfolio-transactions.component";

//import { StockService } from './stock.service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, LoginComponent, UserDetailsComponent, RegisterComponent,
    StockDetailComponent, StockListComponent, MarketTrendsComponent, DashboardComponent, PortfolioAlertComponent,
    PortfolioContainerComponent, NavbarComponent, PortfolioTransactionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web';
}
