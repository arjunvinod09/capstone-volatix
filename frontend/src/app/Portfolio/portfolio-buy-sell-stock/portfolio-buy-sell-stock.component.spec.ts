import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioBuySellStockComponent } from './portfolio-buy-sell-stock.component';

describe('PortfolioBuySellStockComponent', () => {
  let component: PortfolioBuySellStockComponent;
  let fixture: ComponentFixture<PortfolioBuySellStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioBuySellStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioBuySellStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
