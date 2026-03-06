export default interface Contact {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  presence: 'online' | 'idle' | 'dnd' | 'offline';
}
