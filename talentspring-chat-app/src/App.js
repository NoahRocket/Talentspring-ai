import './App.css';
import ChatInterface from './ChatInterface'; // assuming ChatInterface is in a separate file

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-customGreen mb-6">Talentspring Chat</h1>
        <ChatInterface />
      </div>
    </div>
  );
}

export default App;
