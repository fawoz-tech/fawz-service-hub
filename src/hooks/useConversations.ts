
import { useState } from 'react';
import { Conversation, Message } from '@/types/message';

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

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const selectConversation = (conversation: Conversation) => {
    // Mark all messages as read when selecting a conversation
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        // Update the conversation to mark messages as read and reset unread count
        return {
          ...conv,
          unread: 0,
          messages: conv.messages.map(msg => ({ ...msg, read: true }))
        };
      }
      return conv;
    });
    
    // Find the updated conversation to select it
    const updatedConversation = updatedConversations.find(conv => conv.id === conversation.id) || null;
    
    setConversations(updatedConversations);
    setSelectedConversation(updatedConversation);
  };

  const sendMessage = (text: string) => {
    if (!selectedConversation) return;

    // Create a new message
    const newMessage: Message = {
      id: Date.now(), // Simple ID generation
      sender: 'user',
      text,
      timestamp: new Date(),
      read: true
    };

    // Update the selected conversation and the conversations list
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          lastMessage: text,
          timestamp: new Date(),
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    });

    const updatedSelectedConversation = updatedConversations.find(
      conv => conv.id === selectedConversation.id
    ) || null;

    setConversations(updatedConversations);
    setSelectedConversation(updatedSelectedConversation);
  };

  return {
    conversations,
    selectedConversation,
    activeTab,
    selectConversation,
    setActiveTab,
    sendMessage
  };
};
