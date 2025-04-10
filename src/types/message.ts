
export interface Message {
  id: number;
  sender: 'user' | 'customer';
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: number;
  customerName: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  messages: Message[];
  jobId?: string;
}
