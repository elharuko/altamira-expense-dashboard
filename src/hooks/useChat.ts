import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { Message, Conversation, UserProfile, ConversationWithDetails } from '../types/chat';

export function useChat() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener todas las conversaciones del usuario
  const fetchConversations = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Obtener conversaciones
      const { data:  convData, error: convError } = await supabase
        .from('conversations')
        .select('*')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .order('updated_at', { ascending: false });

      if (convError) throw convError;

      // Para cada conversación, obtener detalles del otro usuario y último mensaje
      const conversationsWithDetails = await Promise.all(
        (convData || []).map(async (conv) => {
          const otherUserId = conv.user1_id === user.id ? conv.user2_id : conv.user1_id;

          // Obtener perfil del otro usuario
          const { data: userData } = await supabase
            . from('user_profiles')
            .select('*')
            .eq('id', otherUserId)
            .single();

          // Obtener último mensaje
          const { data: lastMessageData } = await supabase
            .from('messages')
            .select('*')
            .eq('conversation_id', conv. id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          // Contar mensajes no leídos
          const { count:  unreadCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head:  true })
            .eq('conversation_id', conv.id)
            .eq('is_read', false)
            .neq('sender_id', user. id);

          return {
            ...conv,
            other_user: userData as UserProfile,
            last_message: lastMessageData as Message | null,
            unread_count:  unreadCount || 0,
          };
        })
      );

      setConversations(conversationsWithDetails);
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError(err instanceof Error ? err.message :  'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Crear o obtener conversación con un usuario
  const getOrCreateConversation = async (otherUserId: string): Promise<string | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase.rpc('get_or_create_conversation', {
        p_user1_id: user.id,
        p_user2_id: otherUserId,
      });

      if (error) throw error;
      
      await fetchConversations(); // Refrescar lista
      return data;
    } catch (err) {
      console.error('Error creating conversation:', err);
      return null;
    }
  };

  // Suscribirse a cambios en tiempo real
  useEffect(() => {
    if (!user) return;

    fetchConversations();

    // Suscripción a nuevos mensajes
    const messagesSubscription = supabase
      . channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    // Suscripción a cambios en conversaciones
    const conversationsSubscription = supabase
      .channel('conversations-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema:  'public',
          table:  'conversations',
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
      conversationsSubscription.unsubscribe();
    };
  }, [user, fetchConversations]);

  return {
    conversations,
    loading,
    error,
    getOrCreateConversation,
    refreshConversations: fetchConversations,
  };
}