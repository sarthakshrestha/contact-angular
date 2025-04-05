import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <mat-toolbar>
      <span class="navbar" routerLink="/">Contacts</span>
      <button mat-icon-button routerLink="/add">
        <mat-icon>add_circle</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      @use '@angular/material' as mat;

      .navbar {
        cursor: pointer;
      }

      mat-icon-button {
        cursor: pointer;
      }

      mat-toolbar {
        justify-content: space-between;
        background-color: #3f51b5 !important;
        color: white !important;

        @include mat.toolbar-overrides(
          (
            container-background-color: var(--mat-sys-primary),
            container-text-color: var(--mat-sys-on-primary),
          )
        );

        @include mat.icon-button-overrides(
          (
            icon-color: var(--mat-sys-on-primary),
          )
        );
      }

      .container {
        position: relative;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Angular Signals Crud';
}
