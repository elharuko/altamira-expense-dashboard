import { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useChat } from '../../hooks/useChat';
import type { UserProfile } from '../../types/chat';

interface UserSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConversationCreated: (conversationId: string) => void;
}

export default function UserSearchModal({ isOpen, onClose, onConversationCreated }: UserSearchModalProps) {
  const { users, loading } = useUsers();
  const { getOrCreateConversation } = useChat();
  const [searchTerm, setSearchTerm] = useState('');
  const [creating, setCreating] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleSelectUser = async (user: UserProfile) => {
    try {
      setCreating(true);
      const conversationId = await getOrCreateConversation(user.id);
      if (conversationId) {
        onConversationCreated(conversationId);
        onClose();
        setSearchTerm('');
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
      alert('Error al crear la conversación');
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Nuevo Chat</h2>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o email..."
            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>

        {/* Users List */}
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600"></div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">No se encontraron usuarios</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  disabled={creating}
                  className="w-full px-6 py-3 text-left transition-colors hover:bg-gray-50 disabled:opacity-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-blue-500 text-lg font-semibold text-white">
                      {user.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {user.full_name || user.email}
                      </h4>
                      {user.full_name && (
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}