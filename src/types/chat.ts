export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  updated_at: string;
  last_message?:  Message;
  unread_count?:  number;
  other_user?:  UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?:  string;
  avatar_url?:  string;
  created_at?:  string;
}

export interface ConversationWithDetails extends Conversation {
  other_user: UserProfile;
  last_message: Message | null;
  unread_count: number;
}