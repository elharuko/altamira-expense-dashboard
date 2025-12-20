import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import type { ConversationWithDetails, Message } from '../../types/chat';

interface ChatWindowProps {
  conversation: ConversationWithDetails | null;
}

export default function ChatWindow({ conversation }: ChatWindowProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  // Cargar mensajes cuando se selecciona una conversación
  useEffect(() => {
    if (!conversation || !user) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conversation.id)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);

        // Marcar mensajes como leídos
        await supabase
          .from('messages')
          .update({ is_read: true })
          .eq('conversation_id', conversation.id)
          .eq('is_read', false)
          .neq('sender_id', user.id);
      } catch (err) {
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Suscribirse a nuevos mensajes
    const subscription = supabase
      .channel(`messages:${conversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversation.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [conversation, user]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conversation || !user || !messageContent.trim()) return;

    try {
      setSending(true);
      const { error } = await supabase.from('messages').insert({
        conversation_id: conversation.id,
        sender_id: user.id,
        content: messageContent.trim(),
        is_read: false,
      });

      if (error) throw error;
      setMessageContent('');
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Selecciona una conversación para comenzar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {conversation.other_user?.full_name || conversation.other_user?.email || 'Usuario'}
        </h2>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No hay mensajes aún. ¡Sé el primero en escribir!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwn = message.sender_id === user?.id;
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      isOwn
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                    }`}
                  >
                    <p className="break-words">{message.content}</p>
                    <p
                      className={`mt-1 text-xs ${
                        isOwn ? 'text-teal-100' : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {new Date(message.created_at).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Escribe un mensaje..."
            disabled={sending}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={sending || !messageContent.trim()}
            className="rounded-lg bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700 disabled:bg-gray-400"
          >
            {sending ? '...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}