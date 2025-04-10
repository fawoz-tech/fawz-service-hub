
import React from 'react';
import { User, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Conversation } from '@/types/message';

interface ConversationsListProps {
  conversations: Conversation[];
  activeTab: string;
  selectedConversationId: number | null;
  setActiveTab: (tab: string) => void;
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationsList = ({
  conversations,
  activeTab,
  selectedConversationId,
  setActiveTab,
  onSelectConversation
}: ConversationsListProps) => {

  // Helper function to format date
  const formatDate = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="lg:col-span-1 overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 pb-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search conversations..." 
            className="h-9"
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-1 p-0">
        {conversations
          .filter(conv => activeTab === 'all' || conv.unread > 0)
          .map(conversation => (
            <div 
              key={conversation.id}
              className={`flex items-start gap-3 p-3 border-b cursor-pointer hover:bg-secondary-50 transition-colors ${selectedConversationId === conversation.id ? 'bg-secondary-100' : ''}`}
              onClick={() => onSelectConversation(conversation)}
            >
              <Avatar>
                <User className="h-6 w-6" />
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium truncate">{conversation.customerName}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {formatDate(conversation.timestamp)}
                  </span>
                </div>
                {conversation.jobId && (
                  <div className="text-xs text-blue-600 font-medium mt-0.5">
                    {conversation.jobId}
                  </div>
                )}
                <p className="text-sm text-muted-foreground truncate mt-0.5">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread > 0 && (
                <span className="bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs text-white">
                  {conversation.unread}
                </span>
              )}
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default ConversationsList;
