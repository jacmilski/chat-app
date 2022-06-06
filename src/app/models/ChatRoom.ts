export interface ChatRoom {
    roomName: string;
    key?: string;
}

export interface Message {
  email?: string | null;
  username?: string;
  message: string | null;
  timeSent?: string;
}
