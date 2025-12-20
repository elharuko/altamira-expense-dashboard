import { useState } from 'react';
import ConversationList from '../components/chat/ConversationList';
import ChatWindow from '../components/chat/chatWindow';
import UserSearchModal from '../components/chat/UserSearchModal';
import type { ConversationWithDetails } from '../types/chat';
import { useChat } from '../hooks/useChat';

export default function Chats() {
  const [selectedConversation, setSelectedConversation] = useState<ConversationWithDetails | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { conversations, refreshConversations } = useChat();

  const handleConversationCreated = async (conversationId: string) => {
    // Refrescar la lista de conversaciones
    await refreshConversations();
    
    // Esperar un poco para asegurar que los datos estén actualizados
    setTimeout(() => {
      const newConversation = conversations.find((c) => c.id === conversationId);
      if (newConversation) {
        setSelectedConversation(newConversation);
      }
    }, 100);
  };

  return (
    <>
      <div className="flex h-[calc(100vh-180px)] gap-6">
        {/* Sidebar - Lista de conversaciones */}
        <div className="flex w-80 flex-col rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Mensajes</h2>
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="rounded-lg bg-teal-600 p-2 text-white transition-colors hover:bg-teal-700"
              title="Nuevo chat"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Lista */}
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              onSelectConversation={setSelectedConversation}
              selectedConversationId={selectedConversation?.id}
            />
          </div>
        </div>

        {/* Chat principal */}
        <div className="flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <ChatWindow conversation={selectedConversation} />
        </div>
      </div>

      {/* Modal de búsqueda */}
      <UserSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onConversationCreated={handleConversationCreated}
      />
    </>
  );
}