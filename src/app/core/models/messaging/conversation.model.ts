export default interface Conversation {
  id: number;
  contactId: number;
  preview: string;
  time: string;
  unread?: number;
}
