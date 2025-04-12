import React, { useState, useRef, useEffect } from 'react';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    // Add user message to the messages array
    const userMessage = { role: 'user', content: inputValue.trim() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Clear the input field
    setInputValue('');
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Send request to Netlify function
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      // Add assistant response to messages
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: data.data.content }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: 'Oops, something went wrong—try again!' }
      ]);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  // Scroll to the bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-100 p-4 text-xl font-bold text-gray-800 shadow-sm">
        Talentspring AI Career Coach
      </header>
      
      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-white"
      >
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            <p className="mb-2">Ask me anything about your career!</p>
            <p className="text-sm">I can help with resume tips, interview preparation, career transitions, and more.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${message.role === 'user' ? 'text-right' : ''} my-2`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg ${
                    message.role === 'user' 
                      ? 'bg-gray-200 text-gray-800' 
                      : 'bg-customGreen text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="my-2">
                <div className="inline-block p-3 rounded-lg bg-gray-100">
                  <p className="text-sm text-gray-500 italic">Assistant is typing...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <footer className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="w-full p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-customGreen"
            disabled={isLoading}
          />
          <button 
            type="submit"
            className={`p-2 rounded-r font-medium transition-colors ${
              isLoading 
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                : 'bg-customGreen text-gray-800 hover:bg-green-200'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </footer>
    </div>
  );
}

export default ChatInterface;
