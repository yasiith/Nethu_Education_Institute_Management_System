// frontend/app/chatbot/page.jsx
import Chatbot from '@components/Chatbot';

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Chat with our AI Assistant</h1>
        <Chatbot />
      </div>
    </div>
  );
}