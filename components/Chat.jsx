// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [sessionId] = useState('default'); // or generate a unique session ID for each user
//   const [corsTestResult, setCorsTestResult] = useState('');
  
//   const messagesEndRef = useRef(null);
//   const [typing, setTyping] = useState(false);
//   const [currentMessage, setCurrentMessage] = useState('');

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { role: 'user', content: input }];
//     setMessages(newMessages);
//     setInput(''); 

//     setTyping(true); // Start typing effect immediately after user sends message
//     setCurrentMessage(''); // Clear current message for smooth transition


//     try {
//       const response = await axios.post('https://cpg-israelbosun1.replit.app/ask', {
//         query: input,
//         session_id: sessionId,
//       });
//       const answer = response.data.answer;
//       setMessages([...newMessages, { role: 'ai', content: answer }]);
//       setTyping(false); // Stop typing effect after response is displayed
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setMessages([...newMessages, { role: 'ai', content: 'Error: Unable to get response.' }]);
//       setTyping(false); // Stop typing effect in case of error

//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendMessage();
//   };

//   const testCors = async () => {
//     try {
//       const response = await axios.get('https://cpg-israelbosun1.replit.app/test-cors');
//       setCorsTestResult(response.data.message);
//     } catch (error) {
//       console.error('CORS test failed:', error);
//       setCorsTestResult('CORS test failed');
//     }
//   };

//   useEffect(() => {
//     scrollToBottom(); // Ensure scroll after message update

//     if (typing && messages.length > 0) {
//       const lastMessage = messages[messages.length - 1];
//       if (lastMessage.role === 'ai') {
//         let index = 0;
//         const interval = setInterval(() => {
//           setCurrentMessage(lastMessage.content.substring(0, index));
//           index++;
//           if (index > lastMessage.content.length) {
//             clearInterval(interval);
//             setTyping(false);
//           }
//         }, 30); // Adjust typing speed (ms) here
//         return () => clearInterval(interval);
//       }
//     }
//   }, [typing, messages]);

// return (
//   <div className="flex flex-col h-screen bg-gray-800 text-white"> 
//     <div className="bg-gray-900 p-4 text-center text-xl">
//       ChatCPG
//     </div>

//     <div className="flex-grow p-6 overflow-auto custom-scrollbar">
//       {messages.map((msg, index) => (
//         <div
//           key={index}
//           className={`my-3 p-3 rounded-lg w-fit max-w-xs ${
//             msg.role === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'
//           }`}
//           style={{
//             marginLeft: msg.role === 'user' ? 'auto' : 0,
//             marginRight: msg.role === 'ai' ? 'auto' : 0,
//           }}
//         >
//           {msg.role === 'ai' ? currentMessage : msg.content} 
//         </div>
//       ))}
//       <div ref={messagesEndRef} />
//     </div>


//     <form onSubmit={handleSubmit} className="p-4 bg-gray-900">
//       <div className="flex rounded-lg border border-gray-700">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-grow p-2 bg-transparent focus:outline-none"
//           placeholder="Type your message..."
//         />
//         <button type="submit" className="p-2 bg-green-500 hover:bg-green-600 rounded-r-lg">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//           </svg> 
//         </button>
//       </div>
//     </form>
//   </div>
// );
// };

// export default Chat;

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId] = useState('default'); // or generate a unique session ID for each user
  const [corsTestResult, setCorsTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const messagesEndRef = useRef(null);
  const [typing, setTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput(''); // Clear the input box
    setIsLoading(true); // Set loading state

    try {
      const response = await axios.post('https://cpg-israelbosun1.replit.app/ask', {
        query: input,
        session_id: sessionId,
      });
      const answer = response.data.answer;
      const aiMessage = { role: 'ai', content: answer };
      setMessages([...newMessages, aiMessage]);
      setTyping(true);
      typeMessage(answer); // Start the typing effect for the new message
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { role: 'ai', content: 'Error: Unable to get response.' }]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };


  const typeMessage = (message) => {
    let index = -1;
    setCurrentMessage('');
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        index++;
        if (index < message.length) {
          return prev + message[index];
        } else {
          clearInterval(interval);
          setTyping(false);
          return prev; // Return the final message after typing completes
        }
      });
    }, 30); // Adjust typing speed (ms) here
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      sendMessage();
    }
  };


  const testCors = async () => {
    try {
      const response = await axios.get('https://cpg-israelbosun1.replit.app/test-cors');
      setCorsTestResult(response.data.message);
    } catch (error) {
      console.error('CORS test failed:', error);
      setCorsTestResult('CORS test failed');
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessage]);

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white"> 
      <div className="bg-gray-900 p-4 text-center text-xl">
        ChatCPG
      </div>

      <div className="flex-grow p-6 overflow-auto custom-scrollbar max-h-[calc(100vh-10rem)]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-3 p-3 rounded-lg w-fit max-w-xs ${
              msg.role === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'
            }`}
            style={{
              marginLeft: msg.role === 'user' ? 'auto' : 0,
              marginRight: msg.role === 'ai' ? 'auto' : 0,
            }}
          >
            {msg.role === 'ai' && index === messages.length - 1 ? currentMessage : msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="loading-dots self-start">
            <span className='text-3xl'>.</span><span className='text-3xl'>.</span><span className='text-3xl'>.</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
    <div className='flex items-center justify-center '>    
      <form onSubmit={handleSubmit} className="p-4 w-5/6 bg-gray-900 rounded-2xl grid">
        <div className="flex rounded-lg border  border-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow w-full p-2 bg-transparent focus:outline-none  "
            placeholder="Type your message..."
            disabled={isLoading || typing}
          />
          <button type="submit" className="p-2 bg-green-500 hover:bg-green-600 rounded-r-lg" disabled={isLoading || typing}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-8 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg> 
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Chat;
