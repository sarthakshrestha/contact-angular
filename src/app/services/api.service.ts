import { Injectable } from '@angular/core';
import { Contact } from '../model/contact';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private delay = 1000; // Simulate network delay
  private contacts: Contact[] = [
    {
      id: '1',
      name: 'Swechhita Rimal',
      phone: '1234567890',
      email: 'swechhitakoemail24@gmail.com',
    },
    {
      id: '2',
      name: 'Sarthak Shrestha',
      phone: '1234567890',
      email: 'sarthakkoemail@gmail.com',
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      phone: '555-234-5678',
      email: 'sarah.j@email.com',
    },
    {
      id: '4',
      name: 'Michael Williams',
      phone: '555-345-6789',
      email: 'mwilliams@email.com',
    },
    {
      id: '5',
      name: 'Emma Brown',
      phone: '555-456-7890',
      email: 'emma.b@email.com',
    },
    {
      id: '6',
      name: 'James Davis',
      phone: '555-567-8901',
      email: 'james.d@email.com',
    },
    {
      id: '7',
      name: 'Lisa Garcia',
      phone: '555-678-9012',
      email: 'lisa.g@email.com',
    },
    {
      id: '8',
      name: 'David Miller',
      phone: '555-789-0123',
      email: 'david.m@email.com',
    },
    {
      id: '9',
      name: 'Jennifer Wilson',
      phone: '555-890-1234',
      email: 'jwilson@email.com',
    },
    {
      id: '10',
      name: 'Robert Taylor',
      phone: '555-901-2345',
      email: 'rtaylor@email.com',
    },
    {
      id: '11',
      name: 'Maria Martinez',
      phone: '555-012-3456',
      email: 'maria.m@email.com',
    },
  ];

  private generateUniqueId(): string {
    const existingIds = this.contacts.map((c) => parseInt(c.id));
    const maxId = Math.max(...existingIds);
    return (maxId + 1).toString();
  }

  async getContacts(): Promise<Contact[]> {
    await this.simulateDelay();

    // throw new Error('Error fetching contacts');

    return [...this.contacts];
  }

  async addContact(contact: Contact): Promise<Contact> {
    await this.simulateDelay();
    const newContact = {
      ...contact,
      id: this.generateUniqueId(),
    };
    this.contacts = [newContact, ...this.contacts];
    return newContact;
  }

  async deleteContact(id: string): Promise<void> {
    await this.simulateDelay();
    this.contacts = this.contacts.filter((c) => c.id !== id);
  }

  async updateContact(updatedContact: Contact): Promise<Contact> {
    await this.simulateDelay();
    const index = this.contacts.findIndex((c) => c.id === updatedContact.id);
    if (index === -1) {
      throw new Error('Contact not found');
    }
    this.contacts[index] = updatedContact;
    return updatedContact;
  }

  async getContact(id: string): Promise<Contact> {
    await this.simulateDelay();
    const contact = this.contacts.find((c) => c.id === id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  }

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}
