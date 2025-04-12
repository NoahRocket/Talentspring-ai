import React, { useState, useRef, useEffect } from 'react';

function ChatInterface() {
  // State variables to manage chat functionality
  const [messages, setMessages] = useState([]); // Stores the chat history (user and assistant messages)
  const [inputValue, setInputValue] = useState(''); // Manages the text input value
  const [isLoading, setIsLoading] = useState(false); // Tracks when API requests are in progress
  const chatContainerRef = useRef(null); // Reference to the chat container for auto-scrolling

  // Handler for input field changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handler for Enter key press to send messages
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Main function to handle sending messages and API interaction
  const handleSendMessage = async (e) => {
    e.preventDefault();
    // Don't send empty messages
    if (inputValue.trim() === '') return;
    
    // Add user message to the chat history
    const userMessage = { role: 'user', content: inputValue.trim() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Clear the input field immediately for better UX
    setInputValue('');
    
    // Set loading state to show "typing" indicator
    setIsLoading(true);
    
    try {
      // Send the user message to the Netlify serverless function
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });
      
      // Check if the network request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Parse the response data
      const data = await response.json();
      
      // Add the assistant's response to the chat history
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: data.data.content }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // If an error occurs, show a friendly error message
      setMessages(prevMessages => [
        ...prevMessages, 
        { role: 'assistant', content: 'Oops, something went wrong—try again!' }
      ]);
    } finally {
      // Reset loading state regardless of success/failure
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom of chat when new messages are added or loading state changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-white sm:max-w-2xl sm:mx-auto sm:shadow-lg sm:rounded-lg sm:my-8 sm:border sm:border-gray-200 overflow-hidden">
      {/* Header section with title */}
      <header className="bg-gray-100 p-4 text-xl font-bold text-gray-800 shadow-sm border-b border-gray-200 text-center">
        Talentspring AI Career Coach
      </header>
      
      {/* Main chat area with messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-white max-h-[80vh]"
      >
        {/* Show welcome message if no chat history exists */}
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            <p className="mb-2">Ask me anything about your career!</p>
            <p className="text-sm">I can help with resume tips, interview preparation, career transitions, and more.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Map through and display all messages with appropriate styling */}
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`${message.role === 'user' ? 'text-right' : ''} my-3`}
              >
                <div 
                  className={`inline-block p-4 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-gray-200 text-gray-800 rounded-tr-none' // User message styling
                      : 'bg-customGreen text-gray-800 rounded-tl-none' // Assistant message styling
                  } shadow-sm max-w-xs sm:max-w-md md:max-w-lg`}
                >
                  <p className="text-sm md:text-base">{message.content}</p>
                </div>
              </div>
            ))}
            
            {/* Loading indicator - shows when waiting for API response */}
            {isLoading && (
              <div className="my-3">
                <div className="inline-block p-3 rounded-lg bg-gray-100 shadow-sm">
                  <p className="text-gray-600 italic p-2 text-sm">Assistant is typing...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Input area for user to type messages */}
      <footer className="bg-gray-100 border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-customGreen text-gray-800"
            disabled={isLoading} // Disable input while loading
          />
          <button 
            type="submit"
            className={`px-4 py-3 rounded-r font-medium transition-colors whitespace-nowrap ${
              isLoading 
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed' // Disabled button styling
                : 'bg-customGreen text-gray-800 hover:bg-green-200' // Active button styling
            }`}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </footer>
    </div>
  );
}

export default ChatInterface;
