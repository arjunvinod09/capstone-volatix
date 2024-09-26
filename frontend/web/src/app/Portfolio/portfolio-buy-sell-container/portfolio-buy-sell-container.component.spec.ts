import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioBuySellContainerComponent } from './portfolio-buy-sell-container.component';

describe('PortfolioBuySellContainerComponent', () => {
  let component: PortfolioBuySellContainerComponent;
  let fixture: ComponentFixture<PortfolioBuySellContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioBuySellContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioBuySellContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
