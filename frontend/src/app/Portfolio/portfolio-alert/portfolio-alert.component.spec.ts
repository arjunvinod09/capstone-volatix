import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAlertComponent } from './portfolio-alert.component';

describe('PortfolioAlertComponent', () => {
  let component: PortfolioAlertComponent;
  let fixture: ComponentFixture<PortfolioAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
