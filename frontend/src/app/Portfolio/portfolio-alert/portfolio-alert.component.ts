import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-portfolio-alert',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './portfolio-alert.component.html',
  styleUrl: './portfolio-alert.component.css'
})
export class PortfolioAlertComponent {
   @Input() message: string | null = null;

}