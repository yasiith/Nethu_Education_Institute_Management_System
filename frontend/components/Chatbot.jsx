"use client";

import { useState } from 'react';
import { Send, MessageCircle, Loader2, X } from 'lucide-react';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newLog = [...chatLog, { sender: 'user', message: userMessage }];
    setChatLog(newLog);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage }),
      });

      const data = await response.json();
      setChatLog([...newLog, { sender: 'bot', message: data.reply }]);
      setUserMessage('');
    } catch (error) {
      console.error('Error:', error);
      setChatLog([...newLog, { sender: 'bot', message: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={toggleChatbot}
        className="fixed z-50 flex items-center justify-center p-4 text-white transition-all duration-300 bg-indigo-600 rounded-full shadow-lg bottom-6 right-6 hover:bg-indigo-700 hover:scale-105"
        aria-label="Open Chatbot"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[520px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white rounded-full">
                <MessageCircle size={20} className="text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-white">AI Assistant</h3>
            </div>
            <button
              onClick={toggleChatbot}
              className="flex items-center justify-center w-8 h-8 transition-colors rounded-full hover:bg-white/20"
              aria-label="Close Chatbot"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Welcome Message */}
          {chatLog.length === 0 && (
            <div className="flex items-center justify-center flex-1 p-6">
              <div className="max-w-xs text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full dark:bg-indigo-900">
                  <MessageCircle size={28} className="text-indigo-600 dark:text-indigo-300" />
                </div>
                <h4 className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">How can I help you today?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ask me anything and I'll do my best to assist you.
                </p>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto scroll-smooth scrollbar-thin">
            {chatLog.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.sender === 'user' ? 'justify-end' : 'justify-start'
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    chat.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 bg-gray-100 rounded-2xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2">
                    <Loader2 size={16} className="text-indigo-500 animate-spin" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2 p-1 bg-white border border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-transparent border-0 outline-none focus:ring-0 text-gray-800 dark:text-gray-200 placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={loading || !userMessage.trim()}
                className={`rounded-full p-2 flex items-center justify-center ${
                  loading || !userMessage.trim() 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-600' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                } transition-colors`}
                aria-label="Send message"
              >
                <Send size={18} className={loading || !userMessage.trim() ? 'opacity-50' : ''} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add this to your global CSS or as a style tag */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 20px;
        }
      `}</style>
    </>
  );
};

export default Chatbot;