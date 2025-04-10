
import React from 'react';
import Layout from '@/components/Layout';
import ConversationsList from '@/components/messages/ConversationsList';
import MessageThread from '@/components/messages/MessageThread';
import { useConversations } from '@/hooks/useConversations';
import { useLanguage } from '@/contexts/LanguageContext';

const MessagesPage = () => {
  const { 
    conversations,
    selectedConversation,
    activeTab,
    selectConversation,
    setActiveTab,
    sendMessage
  } = useConversations();
  
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{t('messages.title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <ConversationsList
            conversations={conversations}
            activeTab={activeTab}
            selectedConversationId={selectedConversation?.id || null}
            setActiveTab={setActiveTab}
            onSelectConversation={selectConversation}
          />

          {/* Message Thread */}
          <MessageThread
            selectedConversation={selectedConversation}
            onSendMessage={sendMessage}
          />
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;
