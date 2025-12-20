import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { Message } from '../types/chat';

export function useMessages(conversationId:  string | null) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener mensajes
  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err instanceof Error ?  err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  // Enviar mensaje
  const sendMessage = async (content: string) => {
    if (!user || !conversationId || ! content.trim()) return;

    try {
      const { error } = await supabase.from('messages').insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content:  content.trim(),
        is_read: false,
      });

      if (error) throw error;

      // Actualizar timestamp de la conversación
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

    } catch (err) {
      console.error('Error sending message:', err);
      throw err;
    }
  };

  // Marcar mensajes como leídos
  const markAsRead = async () => {
    if (!user || !conversationId) return;

    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', user. id)
        .eq('is_read', false);
    } catch (err) {
      console.error('Error marking messages as read:', err);
    }
  };

  // Suscribirse a nuevos mensajes en tiempo real
  useEffect(() => {
    if (!conversationId) return;

    fetchMessages();
    markAsRead();

    const subscription = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages((prev) => [...prev, payload. new as Message]);
            markAsRead();
          } else if (payload.eventType === 'UPDATE') {
            setMessages((prev) =>
              prev.map((msg) => (msg.id === payload.new. id ? (payload.new as Message) : msg))
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [conversationId, fetchMessages]);

  return {
    messages,
    loading,
    error,
    sendMessage,
    markAsRead,
  };
}