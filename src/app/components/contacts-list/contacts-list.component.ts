import { Component, inject, signal, resource, computed } from '@angular/core';
import { Contact } from '../../model/contact';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../services/api.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'delete-dialog',
  template: `
    <h2 mat-dialog-title>Delete Confirmation</h2>
    <mat-dialog-content>Are you sure you want to delete?</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <button mat-button mat-dialog-close="true">Yes</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, RouterModule],
})
export class DeleteDialogComponent {}

@Component({
  selector: 'app-contacts-list',
  imports: [
    MatListModule,
    MatProgressSpinner,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
  ],
  standalone: true,
  template: `
    <mat-list
      >@for(contact of contactsResource.value(); track contact.id){
      <mat-list-item>
        <h3 matListItemTitle>{{ contact.name }}</h3>
        <p matListItemLine>{{ contact.email }}</p>
        <p matListItemLine>{{ contact.phone }}</p>
        <div matListItemMeta>
          <button mat-icon-button routerLink="/edit/{{ contact.id }}">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button (click)="deleteContact(contact.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </mat-list-item>
      }
    </mat-list>
    @if (loading()){
    <mat-progress-spinner mode="indeterminate" /> }
  `,
  styleUrl: './contacts-list.component.scss',
})
export class ContactsListComponent {
  apiService = inject(ApiService);
  dialog = inject(MatDialog);

  deleting = signal(false);

  loading = computed(
    () => this.contactsResource.isLoading() || this.deleting()
  );

  contactsResource = resource({
    loader: () => this.apiService.getContacts(),
  });

  async deleteContact(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result === 'true') {
        this.deleting.set(true);
        await this.apiService.deleteContact(id);
        this.deleting.set(false);
        this.contactsResource.reload();
      }
    });
  }
}
