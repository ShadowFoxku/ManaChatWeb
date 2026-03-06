import {Injectable, signal} from '@angular/core';
import Conversation from '../../models/messaging/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  conversations = signal<Conversation[]>([]);
}
