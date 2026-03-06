import {Injectable, signal} from '@angular/core';
import Contact from '../../models/messaging/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  contacts = signal<Contact[]>([]);
}
