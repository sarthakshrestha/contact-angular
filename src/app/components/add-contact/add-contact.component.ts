import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  template: ` <h2 class="title">Add Contacts</h2>
    <form class="center">
      <div class="fields">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <mat-icon matPrefix>person</mat-icon>
          <input matInput placeholder="Enter name" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <mat-icon matPrefix>email</mat-icon>
          <input matInput placeholder="Enter email" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Phone Number</mat-label>
          <mat-icon matPrefix>phone</mat-icon>
          <input matInput placeholder="Enter phone number" />
        </mat-form-field>
      </div>

      <div class="actions">
        <button mat-flat-button color="primary">Save</button>
        <button mat-stroked-button routerLink="/">Cancel</button>
      </div>
    </form>`,
  styles: `
    :host {
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .title {
      text-align: center;
    }
    
    .center {
      margin: 0 auto;
      width: 100%;
      max-width: 500px;
    }
    
    .fields {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 0;
      width: 100%;
    }
    
    .actions {
      margin-top: 24px;
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    
    mat-form-field {
      width: 100%;
    }
    
    mat-icon {
      margin-right: 8px;
    }
  `,
})
export class AddContactComponent {}
