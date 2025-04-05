import { Routes } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';

export const routes: Routes = [
  {
    path: '',
    component: ContactsListComponent,
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: AddContactComponent,
    pathMatch: 'full',
  },
];
