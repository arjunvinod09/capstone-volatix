export interface Portfolio {
  portfolioId: string;
  portfolioName: string;
  investmentAgenda: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  totalBalance?: number;
  totalReturns?: number;
  stocks?: PortfolioStock[];
}

export interface PortfolioStock {
  stockId: string;
  stockName: string;
  stockSymbol: string;
  stockImage: string;
  currentPrice: number; 
  priceChangePercentage24h: number;
  holdings: number;
  avgBuyPrice: number;
  returns: number;
  quantity: number;
}


export interface TransactionsDetails {
  transactions: PortfolioTransaction[]; // Assuming the backend returns an array of transactions inside a "transactions" field
}

export interface PortfolioTransaction {
  transactionId: string;
  portfolioId: string;
  stockId: string;
  transactionType: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  transactionDate: Date;
}
