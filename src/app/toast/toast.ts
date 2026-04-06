import { MatSnackBar } from '@angular/material/snack-bar';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ToastService
{
    private snackBar = inject(MatSnackBar);

    showToast(message: string, type: 'success' | 'error' | 'info' = 'info') 
    {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            panelClass: [`${type}-snackbar`],
            verticalPosition: 'top'  
        });
    }

}