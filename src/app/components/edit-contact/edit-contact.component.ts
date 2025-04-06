import {
  Component,
  input,
  inject,
  signal,
  resource,
  linkedSignal,
  computed,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-edit-contact',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    FormsModule,
    MatProgressSpinner,
  ],
  template: `
    <h2 class="title">Edit Contact</h2>
    @if (contactResource.value(); as contact) {
    <form #contactForm="ngForm" class="center" (ngSubmit)="update()">
      <div class="fields">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <mat-icon matPrefix>person</mat-icon>
          <input
            matInput
            required
            minlength="2"
            placeholder="Enter name"
            [(ngModel)]="name"
            name="name"
            #nameInput="ngModel"
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <mat-icon matPrefix>email</mat-icon>
          <input
            matInput
            placeholder="Enter email"
            [(ngModel)]="email"
            name="email"
          />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Phone Number</mat-label>
          <mat-icon matPrefix>phone</mat-icon>
          <input
            matInput
            placeholder="Enter phone number"
            [(ngModel)]="phone"
            name="phone"
          />
        </mat-form-field>
      </div>

      <div class="actions">
        <button mat-flat-button color="primary">Update</button>
        <button mat-stroked-button routerLink="/">Cancel</button>
      </div>
    </form>
    } @else { @if (contactResource.isLoading()) {
    <mat-progress-spinner mode="indeterminate" />
    } } @if (loading()){
    <mat-progress-spinner mode="indeterminate" />
    }
  `,
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
export class EditContactComponent {
  id = input.required<string>();
  router = inject(Router);

  apiService = inject(ApiService);

  name = linkedSignal(() => this.contactResource.value()?.name ?? '');
  email = linkedSignal(() => this.contactResource.value()?.email ?? '');
  phone = linkedSignal(() => this.contactResource.value()?.phone ?? '');

  updating = signal(false);

  contactResource = resource({
    request: this.id,
    loader: ({ request: id }) => this.apiService.getContact(id),
  });

  loading = computed(() => this.contactResource.isLoading() || this.updating());

  async update() {
    this.updating.set(true);
    await this.apiService.updateContact({
      id: this.id(),
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
    });
    console.log('Updating data: ', this.name(), this.email(), this.phone());
    this.router.navigate(['/']);
  }
}
