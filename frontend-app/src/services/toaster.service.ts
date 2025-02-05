import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // We'll use Angular Material Snackbar
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackBar: MatSnackBar) {}

  private show(message: string, action: string, config: MatSnackBarConfig = {}) {
    const snackbarConfig: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center', // Always center horizontally
      verticalPosition: 'top',  // Default to top, but this can be changed dynamically
      ...config
    };
    this.snackBar.open(message, action, snackbarConfig);
  }

  
  showSuccess(message: string) {
    this.show(message, 'Close', {
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string) {
    this.show(message, 'Close', {
      panelClass: ['error-snackbar']
    });
  }

  showInfo(message: string) {
    this.show(message, 'Close', {
      panelClass: ['info-snackbar']
    });
  }

  showWarning(message: string) {
    this.show(message, 'Close', {
      panelClass: ['warning-snackbar']
    });
  }
}
