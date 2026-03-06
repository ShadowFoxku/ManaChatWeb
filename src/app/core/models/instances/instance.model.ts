export interface Instance {
  id: number;
  name: string;
  unread: number;
}

export interface Category {

}

export interface Channel {
  id: number;
  categoryId?: number;
  name: string;
  type: 'text' | 'voice';
  unread?: number;
}

export interface ChannelMessage {

}
