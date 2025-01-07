"use client";

import { useState } from 'react';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to toggle chatbot visibility

  // Toggle Chatbot Popup
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Handle message submission
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
      {/* Floating Chat Icon */}
      <button
        onClick={toggleChatbot}
        className="fixed z-50 p-4 text-white bg-blue-500 rounded-full shadow-lg bottom-6 right-6 hover:bg-blue-600"
        aria-label="Open Chatbot"
      >
        💬
      </button>

      {/* Chatbot Popup Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-6 w-80 h-[500px] bg-white border rounded-lg shadow-lg z-50 flex flex-col">
          {/* Chatbot Header */}
          <div className="flex items-center justify-between p-2 text-white bg-blue-500 rounded-t-lg text-clip">
            <h3 className="items-center text-lg font-semibold">AI Chat Assistant</h3>
            <button
              onClick={toggleChatbot}
              className="text-white hover:text-gray-300 "
            >
              ✖️
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {chatLog.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    chat.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 delay-100 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 delay-200 bg-gray-400 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-white bg-blue-500 rounded-2xl hover:bg-blue-600 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
