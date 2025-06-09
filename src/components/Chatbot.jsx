// src/App.js
import { useEffect, useRef, useState } from 'react';
import '../styles/chatbot.css';


// ChatBot component
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // Initialize with bot message
  useEffect(() => {
    setTimeout(() => {
      setMessages([
        { id: 1, sender: 'bot', text: 'Hi there. How can I help you!' }
      ]);
    }, 500);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Chat bot engine
  const respondTo = (input) => {
    const text = input.toLowerCase();
    
    if (/(hi|sup|hello|hey|hola|howdy)(\s|!|\.|$)/.test(text))
      return "Um... hi?";
    
    if (/what[^ ]* up/.test(text) || /sup/.test(text) || /how are you/.test(text))
      return "This React chatbot is pretty cool, huh?";
    
    if (/l(ol)+/.test(text) || /(ha)+(h|$)/.test(text) || /lmao/.test(text))
      return "What's so funny?";
    
    if (/^no+(\s|!|\.|$)/.test(text))
      return "Don't be such a negative nancy :(";
    
    if (/(cya|bye|see ya|ttyl|talk to you later)/.test(text))
      return ["Alright, see you around", "Good teamwork!"];
    
    if (/(dumb|stupid|is that all)/.test(text))
      return ["Hey I'm just a proof of concept", "You can make me smarter if you'd like"];
    
    if (text === 'noop') 
      return null;
    
    return `${input} what?`;
  }

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate bot thinking
    setTimeout(() => {
      const botReply = respondTo(inputValue);
      setIsTyping(false);
      
      if (botReply) {
        if (Array.isArray(botReply)) {
          // Multiple replies
          const botMessages = botReply.map((text, i) => ({
            id: messages.length + 2 + i,
            sender: 'bot',
            text
          }));
          setMessages(prev => [...prev, ...botMessages]);
        } else {
          // Single reply
          setMessages(prev => [
            ...prev, 
            { id: messages.length + 2, sender: 'bot', text: botReply }
          ]);
        }
      }
    }, Math.floor(Math.random() * (800 - 400) + 400));
  }

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e);
    }
  }

  return (
    <div className="container">
      <h1 className="title">Chat Bot</h1>
      
      <div 
        className="chat" 
        ref={chatContainerRef}
        style={{ paddingBottom: isTyping ? '40px' : '0' }}
      >
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user' : 'other'}`}
          >
            <span className="party">
              {message.sender === 'user' ? 'You' : 'Chatbot'}:
            </span>
            <span className="text">{message.text}</span>
          </div>
        ))}
        
        {isTyping && (
          <div className="busy">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            Chatbot is typing...
          </div>
        )}
      </div>
      
      <div className="input">
        <input 
          type="text" 
          placeholder="Enter your query!" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <a style={{backgroundColor:"#4b7bec"}}onClick={handleSendMessage}>Send</a>
      </div>
    </div>
  );
};

export default ChatBot;