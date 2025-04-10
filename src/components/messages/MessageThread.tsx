
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { User, Phone, Send, Paperclip, MessageSquare } from 'lucide-react';
import { Conversation, Message } from '@/types/message';

interface MessageThreadProps {
  selectedConversation: Conversation | null;
  onSendMessage: (message: string) => void;
}

const MessageThread = ({ selectedConversation, onSendMessage }: MessageThreadProps) => {
  const [newMessage, setNewMessage] = useState<string>('');

  // Helper function to format time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!selectedConversation) {
    return (
      <Card className="lg:col-span-2 overflow-hidden flex flex-col">
        <div className="flex items-center justify-center h-full">
          <div className="text-center p-8">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">No conversation selected</h3>
            <p className="text-muted-foreground">
              Select a conversation from the list to view messages.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-2 overflow-hidden flex flex-col">
      <CardHeader className="pb-4 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar>
              <User className="h-6 w-6" />
            </Avatar>
            <div>
              <CardTitle className="text-base">{selectedConversation.customerName}</CardTitle>
              {selectedConversation.jobId && (
                <p className="text-xs text-blue-600 font-medium">
                  {selectedConversation.jobId}
                </p>
              )}
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {selectedConversation.messages.map(message => (
          <MessageBubble key={message.id} message={message} formatTime={formatTime} />
        ))}
      </CardContent>
      
      <div className="p-3 border-t">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input 
            placeholder="Type a message..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

interface MessageBubbleProps {
  message: Message;
  formatTime: (date: Date) => string;
}

const MessageBubble = ({ message, formatTime }: MessageBubbleProps) => {
  return (
    <div 
      key={message.id} 
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          message.sender === 'user' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-secondary-100 text-secondary-foreground'
        }`}
      >
        <p>{message.text}</p>
        <div className={`text-xs mt-1 ${
          message.sender === 'user' 
            ? 'text-primary-foreground/70' 
            : 'text-secondary-foreground/70'
        }`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
