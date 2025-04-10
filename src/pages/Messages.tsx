
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Search, 
  Send,
  User,
  Phone,
  Paperclip
} from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'customer';
  text: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: number;
  customerName: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  messages: Message[];
  jobId?: string;
}

const MessagesPage = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  
  // Sample data for conversations
  const sampleConversations: Conversation[] = [
    {
      id: 1,
      customerName: "Ahmed Al-Saeed",
      lastMessage: "When will the technician arrive?",
      timestamp: new Date(2025, 3, 10, 10, 30),
      unread: 2,
      jobId: "JOB-2458",
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: "Hello, I booked an AC repair service for today.",
          timestamp: new Date(2025, 3, 10, 10, 15),
          read: true
        },
        {
          id: 2,
          sender: 'customer',
          text: "When will the technician arrive?",
          timestamp: new Date(2025, 3, 10, 10, 30),
          read: false
        }
      ]
    },
    {
      id: 2,
      customerName: "Sara Mohammad",
      lastMessage: "The issue is fixed, thank you!",
      timestamp: new Date(2025, 3, 9, 15, 45),
      unread: 0,
      jobId: "JOB-2455",
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: "Is it possible to get a discount?",
          timestamp: new Date(2025, 3, 9, 14, 30),
          read: true
        },
        {
          id: 2,
          sender: 'user',
          text: "I've applied a 10% discount to your invoice.",
          timestamp: new Date(2025, 3, 9, 15, 30),
          read: true
        },
        {
          id: 3,
          sender: 'customer',
          text: "The issue is fixed, thank you!",
          timestamp: new Date(2025, 3, 9, 15, 45),
          read: true
        }
      ]
    },
    {
      id: 3,
      customerName: "Khalid Al-Otaibi",
      lastMessage: "I need to reschedule my appointment",
      timestamp: new Date(2025, 3, 10, 9, 15),
      unread: 1,
      jobId: "JOB-2461",
      messages: [
        {
          id: 1,
          sender: 'customer',
          text: "I need to reschedule my appointment",
          timestamp: new Date(2025, 3, 10, 9, 15),
          read: false
        }
      ]
    }
  ];

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // In a real app, this would be sent to a backend
    console.log(`Sending message to ${selectedConversation.customerName}: ${newMessage}`);
    
    // Clear the input
    setNewMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
          {/* Conversations List */}
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
              {sampleConversations
                .filter(conv => activeTab === 'all' || conv.unread > 0)
                .map(conversation => (
                  <div 
                    key={conversation.id}
                    className={`flex items-start gap-3 p-3 border-b cursor-pointer hover:bg-secondary-50 transition-colors ${selectedConversation?.id === conversation.id ? 'bg-secondary-100' : ''}`}
                    onClick={() => setSelectedConversation(conversation)}
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

          {/* Message Thread */}
          <Card className="lg:col-span-2 overflow-hidden flex flex-col">
            {selectedConversation ? (
              <>
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
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No conversation selected</h3>
                  <p className="text-muted-foreground">
                    Select a conversation from the list to view messages.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;
