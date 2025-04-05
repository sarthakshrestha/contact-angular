import { Component, inject, signal, resource } from '@angular/core';
import { Contact } from '../../model/contact';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [MatListModule],
  template: `
    <mat-list
      >@for(contact of contactsResource.value(); track contact.id){
      <mat-list-item>
        <h3 matListItemTitle>{{ contact.name }}</h3>
        <p matListItemLine>{{ contact.email }}</p>
        <p matListItemLine>{{ contact.phone }}</p>
      </mat-list-item>
      }
    </mat-list>
  `,
  styleUrl: './contacts-list.component.scss',
})
export class ContactsListComponent {
  apiService = inject(ApiService);

  contactsResource = resource({
    loader: () => this.apiService.getContacts(),
  });

  contacts = signal<Contact[]>([
    {
      id: '1',
      name: 'Swechhita Rimal',
      phone: '9847341958',
      email: 'swechh24@gmail.com',
    },
    {
      id: '2',
      name: 'Sarthak Shrestha',
      phone: '9808315780',
      email: 'sarthakstha24@gmail.com',
    },
  ]);
}
