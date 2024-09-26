import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Portfolio, PortfolioStock, PortfolioTransaction } from '../portfolio.model';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'http://localhost:9001/portfolio';

  constructor(private http: HttpClient) {}

  getAllPortfolios(userId: string): Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(`${this.apiUrl}/getAll`, { params: { userId } });
  }

  addPortfolio(portfolio: Portfolio, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, portfolio, { params: { userId } });
  }

  updatePortfolio(portfolioId: string, portfolio: Portfolio): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, portfolio, { params: { portfolioId } });
  }

  deletePortfolio(portfolioId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, { params: { portfolioId } });
  }

  getPortfolioById(portfolioId: string): Observable<Portfolio> {
    return this.http.get<Portfolio>(`${this.apiUrl}/get/${portfolioId}`);
  }

  getAllStocks(portfolioId: string): Observable<{ stockDetails: any[] }> {
    return this.http.get<{ stockDetails: any[] }>(`${this.apiUrl}/getAllStocks?portfolioId=${portfolioId}`);
  }
 

  buyStock(portfolioId: string, stockId: string, quantity: number): Observable<any> {
    const url = `${this.apiUrl}/buyStock/${quantity}`;
    return this.http.put(url, null, {
      params: {
        stockId: stockId,
        portfolioId: portfolioId
      }
    });
  }

  sellStock(portfolioId: string, stockId: string, quantity: number): Observable<any> {
    const url = `${this.apiUrl}/sellStock/${quantity}`;
    return this.http.put(url, null, {
      params: {
        stockId: stockId,
        portfolioId: portfolioId
      }
    });
  }

 // Adjusted to reflect the response structure
getTransaction(portfolioId: string, stockId: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/getTransaction`, {
    params: { portfolioId, stockId }
  });
}

}
