import React, { useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';
import { useAuth } from '../../context/AuthContext';

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

  const loadConversations = async () => {
    try {
      // Demo data for now
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
        },
        {
          id: 2,
          participant: {
            name: 'Mike Chen',
            avatar: 'MC',
            lastSeen: '1 hour ago'
          },
          lastMessage: 'Great! When can we meet?',
          timestamp: '1:15 PM',
          unread: 0,
          item: 'iPhone Charger'
        },
        {
          id: 3,
          participant: {
            name: 'Emma Davis',
            avatar: 'ED',
            lastSeen: 'Yesterday'
          },
          lastMessage: 'Thanks for the quick response!',
          timestamp: 'Yesterday',
          unread: 0,
          item: 'Study Lamp'
        }
      ];
      setConversations(demoConversations);
      setSelectedConversation(demoConversations[0]);
      loadMessages(demoConversations[0].id);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      // Demo messages
      const demoMessages = [
        {
          id: 1,
          senderId: 'other',
          senderName: 'Sarah Johnson',
          content: 'Hi! I saw your listing for the Calculus textbook. Is it still available?',
          timestamp: '2:25 PM',
          type: 'text'
        },
        {
          id: 2,
          senderId: user?.id,
          senderName: user?.firstName + ' ' + user?.lastName,
          content: 'Yes, it\'s still available! It\'s in great condition.',
          timestamp: '2:27 PM',
          type: 'text'
        },
        {
          id: 3,
          senderId: 'other',
          senderName: 'Sarah Johnson',
          content: 'Perfect! What\'s your asking price?',
          timestamp: '2:28 PM',
          type: 'text'
        },
        {
          id: 4,
          senderId: user?.id,
          senderName: user?.firstName + ' ' + user?.lastName,
          content: 'I\'m asking $80, but I\'m open to negotiation.',
          timestamp: '2:29 PM',
          type: 'text'
        },
        {
          id: 5,
          senderId: 'other',
          senderName: 'Sarah Johnson',
          content: 'Is the textbook still available?',
          timestamp: '2:30 PM',
          type: 'text'
        }
      ];
      setMessages(demoMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      senderId: user?.id,
      senderName: user?.firstName + ' ' + user?.lastName,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Update conversation last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation?.id 
          ? { ...conv, lastMessage: newMessage, timestamp: 'now' }
          : conv
      )
    );
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
                        className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === user?.id
                            ? 'bg-[#137C5C] text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.senderId === user?.id ? 'text-green-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
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
                    <p className="text-gray-500">Select a conversation to start messaging</p>
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