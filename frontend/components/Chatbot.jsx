"use client";

import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Loader2, X, BookOpen, ThumbsUp, ThumbsDown } from 'lucide-react';

const Chatbot = ({ userGrade = null, className = '' }) => {
  const [userMessage, setUserMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [studentGrade, setStudentGrade] = useState(userGrade || null);
  const [showGradeSelector, setShowGradeSelector] = useState(!userGrade);
  const [suggestions, setSuggestions] = useState([
    "How do I solve quadratic equations?",
    "Explain photosynthesis",
    "What is the water cycle?",
    "Help me understand fractions"
  ]);
  
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleGradeSelect = (grade) => {
    setStudentGrade(grade);
    setShowGradeSelector(false);
    // Add welcome message based on grade
    setChatLog([
      { 
        sender: 'bot', 
        message: `Welcome to your Grade ${grade} learning assistant! What would you like help with today?`,
        timestamp: new Date()
      }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // Add user message to chat log
    const newLog = [
      ...chatLog, 
      { 
        sender: 'user', 
        message: userMessage,
        timestamp: new Date()
      }
    ];
    setChatLog(newLog);
    setLoading(true);

    // Save message for API call
    const currentMessage = userMessage;
    setUserMessage('');

    try {
      const response = await fetch('https://nethu-education-institute-management.onrender.com/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userMessage: currentMessage,
          grade: studentGrade,
          chatHistory: chatLog.slice(-6) // Send only last 6 messages for context
        }),
      });

      const data = await response.json();
      
      // Update suggestions if we got relevant content
      if (data.hasRelevantContent && data.topicFound) {
        // Fetch related questions for this topic
        try {
          const questionsResponse = await fetch(`https://nethu-education-institute-management.onrender.com/api/chatbot/relatedQuestions/${data.topicFound}?grade=${studentGrade}`);
          const questionsData = await questionsResponse.json();
          
          if (questionsData.questions && questionsData.questions.length > 0) {
            setSuggestions(
              questionsData.questions
                .slice(0, 4)
                .map(q => q.question)
            );
          }
        } catch (error) {
          console.error('Error fetching related questions:', error);
        }
      }
      
      // Add bot response to chat log
      setChatLog([
        ...newLog, 
        { 
          sender: 'bot', 
          message: data.reply,
          topicFound: data.topicFound,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setChatLog([
        ...newLog, 
        { 
          sender: 'bot', 
          message: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date() 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUserMessage(suggestion);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
        <div className={`fixed bottom-20 right-6 w-96 h-[520px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700 ${className}`}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white rounded-full">
                <BookOpen size={20} className="text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-white">
                {studentGrade ? `Grade ${studentGrade} Assistant` : 'Learning Assistant'}
              </h3>
            </div>
            <button
              onClick={toggleChatbot}
              className="flex items-center justify-center w-8 h-8 transition-colors rounded-full hover:bg-white/20"
              aria-label="Close Chatbot"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Grade Selection */}
          {showGradeSelector && (
            <div className="flex flex-col items-center justify-center flex-1 p-6">
              <div className="w-full max-w-xs text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full dark:bg-indigo-900">
                  <BookOpen size={28} className="text-indigo-600 dark:text-indigo-300" />
                </div>
                <h4 className="mb-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                  Select your grade level
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                    <button
                      key={grade}
                      onClick={() => handleGradeSelect(grade)}
                      className="flex items-center justify-center px-3 py-2 font-medium transition-colors border rounded-lg hover:bg-indigo-500 hover:text-white border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Welcome Message */}
          {!showGradeSelector && chatLog.length === 0 && (
            <div className="flex items-center justify-center flex-1 p-6">
              <div className="max-w-xs text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full dark:bg-indigo-900">
                  <BookOpen size={28} className="text-indigo-600 dark:text-indigo-300" />
                </div>
                <h4 className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                  How can I help you learn today?
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ask me any question about your schoolwork and I'll do my best to help you understand.
                </p>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          {!showGradeSelector && (
            <>
              <div 
                ref={chatContainerRef}
                className="flex-1 p-4 space-y-3 overflow-y-auto scroll-smooth scrollbar-thin"
              >
                {chatLog.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      chat.sender === 'user' ? 'justify-end' : 'justify-start'
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="max-w-[85%]">
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          chat.sender === 'user'
                            ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {chat.message}
                        
                        {/* Display topic found badge */}
                        {chat.topicFound && (
                          <div className="mt-2 text-xs text-indigo-200 dark:text-indigo-300">
                            <span className="inline-flex items-center px-2 py-1 bg-indigo-700 rounded-full dark:bg-indigo-800">
                              <BookOpen size={12} className="mr-1" />
                              {chat.topicFound}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Message timestamp */}
                      <div className={`text-xs mt-1 ${
                        chat.sender === 'user' ? 'text-right text-gray-500' : 'text-left text-gray-500'
                      }`}>
                        {chat.timestamp && formatTime(chat.timestamp)}
                      </div>
                      
                      {/* Feedback buttons - only for bot messages */}
                      {chat.sender === 'bot' && (
                        <div className="flex mt-1 space-x-2">
                          <button 
                            className="flex items-center text-xs text-gray-500 hover:text-green-500"
                            aria-label="Helpful"
                          >
                            <ThumbsUp size={12} className="mr-1" />
                            Helpful
                          </button>
                          <button 
                            className="flex items-center text-xs text-gray-500 hover:text-red-500"
                            aria-label="Not helpful"
                          >
                            <ThumbsDown size={12} className="mr-1" />
                            Not helpful
                          </button>
                        </div>
                      )}
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

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="px-4 py-2 overflow-x-auto bg-gray-50 dark:bg-gray-800">
                  <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">Try asking:</p>
                  <div className="flex space-x-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3 py-1 text-xs text-indigo-700 whitespace-nowrap bg-indigo-100 rounded-full dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-2 p-1 bg-white border border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Ask your question..."
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
            </>
          )}
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