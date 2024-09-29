import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PortfolioService } from '../../portfolio-service';
import { SnackBarService } from '../../snack-bar-service';

@Component({
  standalone: true,
  selector: 'app-delete-portfolio',
  templateUrl: './delete-portfolio.component.html',
  styleUrls: ['./delete-portfolio.component.css'],
  imports: [MatDialogModule]
})
export class DeletePortfolioComponent {
  constructor(
    private dialogRef: MatDialogRef<DeletePortfolioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { portfolioId: string },
    private portfolioService: PortfolioService,
    private snackBarService: SnackBarService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.portfolioService.deletePortfolio(this.data.portfolioId).subscribe(
      (response) => {
        this.snackBarService.openSnackBar('Portfolio deleted successfully');
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error deleting portfolio:', error);
        this.snackBarService.openSnackBar('Error deleting portfolio');
      }
    );
  }
}
