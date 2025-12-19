import React, { useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import supabaseService from '../../services/supabase';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // Subscribe to new messages for the selected conversation
      const subscription = supabaseService.subscribeToMessages(
        selectedConversation.id,
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages(prev => [...prev, payload.new]);
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [selectedConversation]);

  const loadConversations = async () => {
    try {
      const token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
      if (token === 'demo-token-123') {
        // Demo data
        const demoConversations = [
          {
            id: 1,
            participant: {
              name: 'Sarah Johnson',
              avatar: 'SJ',
              lastSeen: '2 min ago'
            },
            lastMessage: 'Is the textbook still available?',
            timestamp: '2:30 PM',
            unread: 2,
            item: 'Calculus Textbook'
          }
        ];
        setConversations(demoConversations);
        setSelectedConversation(demoConversations[0]);
        loadMessages(demoConversations[0].id);
      } else if (user?.id) {
        // Load real conversations from Supabase
        const realConversations = await supabaseService.getConversations(user.id);
        const formattedConversations = realConversations.map(conv => {
          const otherUser = conv.user1_id === user.id ? conv.user2 : conv.user1;
          return {
            id: conv.id,
            participant: {
              name: `${otherUser.first_name} ${otherUser.last_name}`,
              avatar: `${otherUser.first_name[0]}${otherUser.last_name[0]}`,
              lastSeen: 'Online'
            },
            lastMessage: 'Start a conversation',
            timestamp: new Date(conv.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            unread: 0,
            item: 'General'
          };
        });
        setConversations(formattedConversations);
      }
    } catch (error) {
      console.error('Failed to load conversations:', error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      const token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
      if (token === 'demo-token-123') {
        // Demo messages
        const demoMessages = [
          {
            id: 1,
            sender_id: 'other',
            sender: { first_name: 'Sarah', last_name: 'Johnson' },
            content: 'Hi! I saw your listing for the Calculus textbook. Is it still available?',
            created_at: new Date(Date.now() - 300000).toISOString(),
          },
          {
            id: 2,
            sender_id: user?.id,
            sender: { first_name: user?.firstName, last_name: user?.lastName },
            content: 'Yes, it\'s still available! It\'s in great condition.',
            created_at: new Date(Date.now() - 180000).toISOString(),
          },
          {
            id: 3,
            sender_id: 'other',
            sender: { first_name: 'Sarah', last_name: 'Johnson' },
            content: 'Perfect! What\'s your asking price?',
            created_at: new Date(Date.now() - 120000).toISOString(),
          },
          {
            id: 4,
            sender_id: user?.id,
            sender: { first_name: user?.firstName, last_name: user?.lastName },
            content: 'I\'m asking ₦80, but I\'m open to negotiation.',
            created_at: new Date(Date.now() - 60000).toISOString(),
          },
          {
            id: 5,
            sender_id: 'other',
            sender: { first_name: 'Sarah', last_name: 'Johnson' },
            content: 'Is the textbook still available?',
            created_at: new Date().toISOString(),
          }
        ];
        setMessages(demoMessages);
      } else {
        // Load real messages from Supabase
        const realMessages = await supabaseService.getMessages(conversationId);
        setMessages(realMessages);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
      setMessages([]);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
      if (token === 'demo-token-123') {
        // Demo mode - add message locally
        const message = {
          id: Date.now(),
          sender_id: user?.id,
          sender: { first_name: user?.firstName, last_name: user?.lastName },
          content: newMessage,
          created_at: new Date().toISOString(),
        };
        setMessages(prev => [...prev, message]);
      } else {
        // Real mode - send via Supabase
        const otherUserId = selectedConversation.participant.id || 'demo-user';
        await supabaseService.sendMessage(user.id, otherUserId, newMessage);
      }

      setNewMessage('');

      // Update conversation last message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation?.id 
            ? { ...conv, lastMessage: newMessage, timestamp: 'now' }
            : conv
        )
      );
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#137C5C]"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-8rem)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className={`w-full lg:w-1/3 border-r border-gray-200 flex flex-col ${
              selectedConversation ? 'hidden lg:flex' : 'flex'
            }`}>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                <p className="text-sm text-gray-500">{conversations.length} conversations</p>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversation(conversation);
                      loadMessages(conversation.id);
                    }}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                      selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#137C5C] to-[#0f5132] rounded-full flex items-center justify-center text-white font-bold">
                        {conversation.participant.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.participant.name}
                          </p>
                          <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">Re: {conversation.item}</p>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <div className="w-5 h-5 bg-[#137C5C] rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">{conversation.unread}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col ${
              selectedConversation ? 'flex' : 'hidden lg:flex'
            }`}>
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setSelectedConversation(null)}
                          className="lg:hidden p-2 hover:bg-gray-200 rounded-full"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <div className="w-10 h-10 bg-gradient-to-r from-[#137C5C] to-[#0f5132] rounded-full flex items-center justify-center text-white font-bold">
                          {selectedConversation.participant.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedConversation.participant.name}</p>
                          <p className="text-sm text-gray-500">Last seen {selectedConversation.participant.lastSeen}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">About: {selectedConversation.item}</p>
                        <button className="text-sm text-[#137C5C] hover:text-[#0f5132]">View Item</button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender_id === user?.id
                            ? 'bg-[#137C5C] text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender_id === user?.id ? 'text-green-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#137C5C] focus:border-transparent"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="px-6 py-2 bg-[#137C5C] text-white rounded-lg hover:bg-[#0f5132] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <p className="text-gray-500">No messages yet. Start swapping to connect with other students!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;