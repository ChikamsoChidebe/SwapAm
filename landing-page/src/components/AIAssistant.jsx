import React, { useState, useRef, useEffect } from 'react';
import apiService from '../services/api';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', content: 'Hi! I\'m your SwapAm AI. Ask me about valuations, trends, or trading tips!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getAIResponse(userMessage);
      setMessages(prev => [...prev, { type: 'ai', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: 'Sorry, I\'m having trouble connecting right now. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = async (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('value') || lowerMessage.includes('price')) {
      return 'I can help you value your items accurately! Use our AI Dashboard valuation tool for detailed analysis, or tell me about your item including category, condition, brand, and age. I\'ll provide a market-based estimate in Nigerian Naira considering current student demand and local pricing trends.';
    }
    
    if (lowerMessage.includes('trend') || lowerMessage.includes('market')) {
      return 'Current market trends show Electronics and Books are in high demand among Nigerian students. Electronics average ₦25,000, Books around ₦3,000. Check our AI Dashboard for comprehensive market analysis, demand patterns, and pricing insights across all categories.';
    }
    
    if (lowerMessage.includes('sell') || lowerMessage.includes('swap')) {
      return 'Here\'s how to successfully trade on SwapAm: 1) Create detailed listings with clear photos and descriptions 2) Choose your exchange type (swap, sell, or donate) 3) Connect with verified students through secure messaging 4) Arrange safe campus meetups in designated areas during daylight hours.';
    }
    
    if (lowerMessage.includes('safe')) {
      return 'SwapAm prioritizes your safety with multiple security measures: university email verification for all users, secure in-app messaging system, designated safe meeting points on campus, user rating system, and transaction history tracking. Always meet in public campus areas during daylight hours.';
    }

    try {
      const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
      console.log('API Key check:', GROQ_API_KEY ? 'Found' : 'Missing');
      
      if (!GROQ_API_KEY) {
        // Fallback to predefined responses if no API key
        if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
          return 'I\'m here to assist you with SwapAm! I can help with item valuations, explain market trends, provide trading guidance, and share safety tips.';
        }
        return 'I\'m your SwapAm AI assistant! API key not found in environment. For now, I can help with basic questions about valuations, trends, and trading.';
      }
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [{ 
            role: 'user', 
            content: `SwapAm is a campus marketplace for university students to swap/sell physical items like books, electronics, clothing. Not blockchain/crypto. Provide helpful detailed response in English, 50-80 words: "${message}"` 
          }],
          max_tokens: 120
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.choices?.[0]?.message?.content || 'I help with SwapAm trading, valuations, and campus marketplace tips!';
      }
    } catch (error) {
      console.error('AI response error:', error);
      // Add more predefined responses as fallback
      if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
        return 'I\'m here to assist you with SwapAm! I can help with item valuations, explain market trends, provide trading guidance, and share safety tips.';
      }

      if (lowerMessage.includes('start') || lowerMessage.includes('begin')) {
        return 'Getting started on SwapAm is easy! First, sign up with your university email for verification. Then browse items or create listings.';
      }

      if (lowerMessage.includes('book') || lowerMessage.includes('textbook')) {
        return 'Books are popular on SwapAm! Textbooks typically range from ₦2,000-₦8,000 depending on subject and condition.';
      }

      if (lowerMessage.includes('electronic') || lowerMessage.includes('laptop') || lowerMessage.includes('phone')) {
        return 'Electronics are in high demand! Laptops range ₦15,000-₦80,000, phones ₦8,000-₦50,000 depending on brand and condition.';
      }
    }
    
    return 'I\'m your SwapAm AI assistant, here to help you navigate our campus marketplace! I can assist with accurate item valuations using current market data, provide insights on trending categories and pricing, offer safety tips for secure trading, and guide you through the listing and exchange process. What specific aspect of campus trading would you like to explore?';
  };

  const quickActions = [
    { text: 'Value item', action: () => setInputMessage('Value my item') },
    { text: 'Trends', action: () => setInputMessage('Market trends') },
    { text: 'Safety tips', action: () => setInputMessage('Safety tips') },
    { text: 'How to sell', action: () => setInputMessage('How to sell') }
  ];

  return (
    <>
      {/* AI Assistant Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-[#137C5C] to-[#0f5132] hover:shadow-xl hover:scale-110'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <div className="flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#137C5C] to-[#0f5132] p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">SwapAm AI</div>
                <div className="text-xs text-green-200">Online • Ready to help</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  message.type === 'user'
                    ? 'bg-[#137C5C] text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="text-xs text-gray-500 mb-2">Quick actions:</div>
              <div className="flex flex-wrap gap-1">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors"
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-[#137C5C]"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="w-8 h-8 bg-[#137C5C] text-white rounded-full flex items-center justify-center hover:bg-[#0f5132] transition-colors disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}