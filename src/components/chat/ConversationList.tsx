
import { useChat } from '../../hooks/useChat';
import type { ConversationWithDetails } from '../../types/chat';

interface ConversationListProps {
  onSelectConversation: (conversation: ConversationWithDetails) => void;
  selectedConversationId?: string | null;
}

export default function ConversationList({
  onSelectConversation,
  selectedConversationId,
}:  ConversationListProps) {
  const { conversations, loading } = useChat();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600"></div>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No hay conversaciones aún. <br />
          Busca un usuario para comenzar a chatear. 
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {conversations.map((conversation) => {
        const isSelected = conversation.id === selectedConversationId;
        const hasUnread = (conversation.unread_count || 0) > 0;

        return (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`w-full px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
              isSelected ?  'bg-teal-50 dark:bg-teal-900/20' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-blue-500 text-lg font-semibold text-white">
                {conversation.other_user?.full_name?.[0]?.toUpperCase() ||
                  conversation.other_user?.email?.[0]?.toUpperCase() ||
                  '?'}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4
                    className={`truncate text-sm font-semibold ${
                      hasUnread
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {conversation.other_user?.full_name || conversation.other_user?.email || 'Usuario'}
                  </h4>
                  {hasUnread && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                      {conversation.unread_count}
                    </span>
                  )}
                </div>

                {conversation.last_message && (
                  <p
                    className={`mt-1 truncate text-xs ${
                      hasUnread ?  'font-medium text-gray-600 dark:text-gray-400' : 'text-gray-500 dark:text-gray-500'
                    }`}
                  >
                    {conversation.last_message.content}
                  </p>
                )}

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  {new Date(conversation.updated_at).toLocaleString('es-ES', {
                    day: '2-digit',
                    month: 'short',
                    hour:  '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}