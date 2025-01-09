// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [sessionId] = useState('default'); // or generate a unique session ID for each user
//   const [corsTestResult, setCorsTestResult] = useState('');
//   const [isLoading, setIsLoading] = useState(false);


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
//     setInput(''); // Clear the input box
//     setIsLoading(true); // Set loading state

//     try {
//       const response = await axios.post('https://cpg-israelbosun1.replit.app/ask', {
//         query: input,
//         session_id: sessionId,
//       });
//       const answer = response.data.answer;
//       const aiMessage = { role: 'ai', content: answer };
//       setMessages([...newMessages, aiMessage]);
//       setTyping(true);
//       typeMessage(answer); // Start the typing effect for the new message
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setMessages([...newMessages, { role: 'ai', content: 'Error: Unable to get response.' }]);
//     } finally {
//       setIsLoading(false); // Reset loading state
//     }
//   };


//   const typeMessage = (message) => {
//     let index = -1;
//     setCurrentMessage('');
//     const interval = setInterval(() => {
//       setCurrentMessage((prev) => {
//         index++;
//         if (index < message.length) {
//           return prev + message[index];
//         } else {
//           clearInterval(interval);
//           setTyping(false);
//           return prev; // Return the final message after typing completes
//         }
//       });
//     }, 30); // Adjust typing speed (ms) here
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!isLoading) {
//       sendMessage();
//     }
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
//     scrollToBottom();
//   }, [currentMessage]);

//   return (
//     <div className="flex flex-col h-screen bg-gray-800 text-white"> 
//       <div className="bg-gray-900 p-4 text-center text-xl">
//         ChatCPG
//       </div>

//       <div className="flex-grow p-6 overflow-auto custom-scrollbar max-h-[calc(100vh-10rem)]">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`my-3 p-3 rounded-lg w-fit max-w-xs ${
//               msg.role === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'
//             }`}
//             style={{
//               marginLeft: msg.role === 'user' ? 'auto' : 0,
//               marginRight: msg.role === 'ai' ? 'auto' : 0,
//             }}
//           >
//             {msg.role === 'ai' && index === messages.length - 1 ? currentMessage : msg.content}
//           </div>
//         ))}
//         {isLoading && (
//           <div className="loading-dots self-start">
//             <span className='text-3xl'>.</span><span className='text-3xl'>.</span><span className='text-3xl'>.</span>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
      
//     <div className='flex items-center justify-center '>    
//       <form onSubmit={handleSubmit} className="p-4 w-5/6 bg-gray-900 rounded-2xl grid">
//         <div className="flex rounded-lg border  border-gray-700">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="flex-grow w-full p-2 bg-transparent focus:outline-none  "
//             placeholder="Type your message..."
//             disabled={isLoading || typing}
//           />
//           <button type="submit" className="p-2 bg-green-500 hover:bg-green-600 rounded-r-lg" disabled={isLoading || typing}>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-8 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//             </svg> 
//           </button>
//         </div>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default Chat;




























// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [sessionId] = useState('default');
//   const [corsTestResult, setCorsTestResult] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [currentMessage, setCurrentMessage] = useState('');
//   const [file, setFile] = useState(null); // Store the uploaded file
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const sendMessage = async () => {
//     if (!input.trim() && !file) return;

//     const newMessages = [...messages, { role: 'user', content: input }];
//     setMessages(newMessages);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const formData = new FormData();
//       if (file) {
//         formData.append('file', file); // Append the file to FormData
//       }
//       formData.append('query', input); // Append the query if there's one

//       const response = await axios.post('https://fambot-backend.onrender.com/ask', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       const answer = response.data.answer;
//       const aiMessage = { role: 'ai', content: answer };
//       setMessages([...newMessages, aiMessage]);
//       setTyping(true);
//       typeMessage(answer);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setMessages([...newMessages, { role: 'ai', content: 'Error: Unable to get response.' }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const typeMessage = (message) => {
//     let index = -1;
//     setCurrentMessage('');
//     const interval = setInterval(() => {
//       setCurrentMessage((prev) => {
//         index++;
//         if (index < message.length) {
//           return prev + message[index];
//         } else {
//           clearInterval(interval);
//           setTyping(false);
//           return prev;
//         }
//       });
//     }, 30);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!isLoading) {
//       sendMessage();
//     }
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

//   // Handle file input change
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]); // Store the selected file
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-800 text-white">
//       <div className="bg-gray-900 p-4 text-center text-xl">
//         ChatCPG
//       </div>

//       <div className="flex-grow p-6 overflow-auto custom-scrollbar max-h-[calc(100vh-10rem)]">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`my-3 p-3 rounded-lg w-fit max-w-xs ${
//               msg.role === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'
//             }`}
//             style={{
//               marginLeft: msg.role === 'user' ? 'auto' : 0,
//               marginRight: msg.role === 'ai' ? 'auto' : 0,
//             }}
//           >
//             {msg.role === 'ai' && index === messages.length - 1 ? currentMessage : msg.content}
//           </div>
//         ))}
//         {isLoading && (
//           <div className="loading-dots self-start">
//             <span className='text-3xl'>.</span><span className='text-3xl'>.</span><span className='text-3xl'>.</span>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className='flex items-center justify-center '>
//         <form onSubmit={handleSubmit} className="p-4 w-5/6 bg-gray-900 rounded-2xl grid">
//           <div className="flex rounded-lg border  border-gray-700">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               className="flex-grow w-full p-2 bg-transparent focus:outline-none"
//               placeholder="Type your message..."
//               disabled={isLoading || typing}
//             />
//             <button type="submit" className="p-2 bg-green-500 hover:bg-green-600 rounded-r-lg" disabled={isLoading || typing}>
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-8 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//               </svg>
//             </button>
//           </div>
          
//           {/* File Upload Section */}
//           <div className="mt-2">
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={handleFileChange}
//               disabled={isLoading || typing}
//               className="p-2 bg-transparent text-white"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Chat;






import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [file, setFile] = useState(null); // Store the uploaded file
  const [fileUploaded, setFileUploaded] = useState(false); // Track file upload status
  const [uploadError, setUploadError] = useState('');
  const messagesEndRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Reset session when a new file is uploaded
  const resetSession = () => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
    setTyping(false);
    setCurrentMessage('');
    setFileUploaded(false);
  };

  // Handle file upload
  const uploadFile = async () => {
    if (!file) {
      setUploadError('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // Ensure the key matches the backend expectation

    setIsLoading(true);
    setUploadError('');
    try {
      const response = await axios.post('https://fambot-backend-2.onrender.com/upload-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        resetSession(); // Clear the session for a fresh start
        setFileUploaded(true);
        setMessages([
          { role: 'system', content: 'PDF uploaded successfully. You can now chat with it!' },
        ]);
      } else {
        setUploadError('Failed to upload the file. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Error uploading the file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() && !fileUploaded) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://fambot-backend-2.onrender.com/ask', { query: input });
      const answer = response.data.answer;
      const aiMessage = { role: 'ai', content: answer };
      setMessages([...newMessages, aiMessage]);
      setTyping(true);
      typeMessage(answer);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { role: 'ai', content: 'Error: Unable to get response.' }]);
    } finally {
      setIsLoading(false);
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
          return prev;
        }
      });
    }, 30);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      sendMessage();
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log('Selected file:', selectedFile); // Debugging: Log the selected file
    setFile(selectedFile);
    resetSession(); // Reset session whenever a new file is selected
    setUploadError(''); // Clear any previous upload error
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    uploadFile();
  };

  // const formatMessageContent = (content) => {
  //   // Replace "**text**" with bold <strong> tags
  //   const formattedText = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  //   // Add line breaks and spacing for numbered lists
  //   const numberedList = formattedText.replace(/(\d+)\.\s/g, '<br/><br/>$1. ');

  //   return numberedList;
  // };

  // const formatMessageContent = (content) => {
  //   // Replace "**text**" with bold <strong> tags
  //   let formattedText = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  //   // Replace "### text" with headings that start on a new line with one line space
  //   formattedText = formattedText.replace(/###\s*(.*)/g, '<br/><br/><h3>$1</h3><br/>');
  
  //   // Add line breaks and spacing for numbered lists, but exclude monetary values (e.g., "123.45")
  //   formattedText = formattedText.replace(/(\d+)\.(?!\d)/g, '<br/><br/>$1.');
  
  //   return formattedText;
  // };

  const formatMessageContent = (content) => {
    // Replace "**text**" with bold <strong> tags
    let formattedText = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Replace "### text" with <h3> tags without extra line breaks
    formattedText = formattedText.replace(/###\s*(.*)/g, '<h3>$1</h3>');
  
    // Replace "## text" with <h2> tags without extra line breaks
    formattedText = formattedText.replace(/##\s*(.*)/g, '<h2>$1</h2>');
  
    // Replace "# text" with <h1> tags without extra line breaks
    formattedText = formattedText.replace(/#\s*(.*)/g, '<h1>$1</h1>');
  
    // Add line breaks and spacing for numbered lists, but exclude monetary values (e.g., "123.45")
    formattedText = formattedText.replace(/(\d+)\.(?!\d)/g, '<br/>$1.');
  
    return formattedText;
  };
  
  

  const questions = [
    {
      title: 'FAM Details',
      content:
        'Do a full detailed summary of the request, business location, the name of the customer, detailing the loan amount/ enhancement, purpose of the loan, collateral description and coverage analysis, repayment capacity.',
    },
    {
      title: 'Group Facility and Exposure Summary',
      content:
        'Analyze the group facility and group exposure summary in this Facility Approval Memo (FAM). Identify if there are any discrepancies or issues. Evaluate if the exposures are aligned with the banks risk appetite and provide any concerns or observations.',
    },
    {
      title: 'Security Support and Coverage Analysis',
      content:
        'Evaluate the security support structure and security coverage analysis in this FAM. Determine if the proposed securities are appropriate and sufficient to cover the loan amount. Highlight any risks associated with the securities and assess if the FAM properly mitigates these risks. If there are unmitigated risks, identify them and explain their potential impact.',
    },
    {
      title: 'Critical Credit Issues and Risk Mitigation',
      content:
        'Review the critical credit issues and risks highlighted in this FAM. Assess if they were properly mitigated and provide a detailed explanation. Identify any additional risks not covered in the FAM that could pose concerns, and suggest measures to address them.',
    },
    {
      title: 'Financial Analysis',
      content:
        'Analyze the historical and projected financials of the obligor in this FAM, including detailed figures and trends of the sales and profitability, liquidity and leverage, cashflow, asset management  Provide insights into the obligors capacity to repay the loan based on their financial performance and projections. Highlight any trends, concerns related to repayment ability, or issues impacting financial stability.',
    },
    {
      title: 'Recommendation 1',
      content:
        'Give a review of the fam based on the following Borrower Profile: Clearly state the borrower’s line of business (e.g., merchandise dealer, FMCG wholesale), specify the location of operations and primary market coverage, and list key suppliers or partners to establish credibility and supply chain stability. 2. Loan Request Details: Indicate the type of facility (e.g., renewal, enhancement, or new facility like Overdraft or Term Loan), specify the requested enhancement or renewal amount, and highlight the rationale for the request (e.g., increased working capital due to rising costs). 3. Banking Relationship: Provide details on account activity, including total turnover across all banks, wallet share percentage controlled by the institution, and monthly collection consistency with average amounts. Include information on existing obligations, such as active loans or overdrafts with other financial institutions and their repayment status, along with evidence of resolution for classified accounts. Ensure updated and clean credit reports on any flagged accounts or facilities. 4. Financial Performance: Confirm turnover and profitability using audited financial statements (AFS) to validate a growing and profitable business, and highlight minimal liabilities relative to turnover and profitability. 5. Security/Collateral: Specify the proposed collateral (e.g., Tripartite Legal Mortgage) and its valuation, including Fair Sale Value (FSV) and its coverage relative to the facility amount, ensuring that the net coverage ratio meets acceptable thresholds (e.g., 120%). 6. Loan Terms: Clearly state the approved facility amount, specify the required monthly collection-to-exposure ratio (CER) (e.g., 150%), and include details of the tenor and cleanup requirements (e.g., 90 days). 7. Conditions Precedent: For pre-disbursement, ensure updated credit checks on flagged positions, evidence of repayment or clearance of classified amounts, and execution of all security documentation. For post-disbursement, maintain agreed CER and account activity levels. 8. Justification for Approval: Highlight evidence of the borrower’s capacity to efficiently utilize the facility, note their demonstrated stability and repayment history, and address identified risks with proper mitigants (e.g., stable inflow trends, collateral coverage).',
    },
    {
      title: 'Recommendation 2',
      content:
        'Review the following Facility Approval Memo (FAM) from a critical credit analysts perspective. Identify any lapses or issues in the content, such as inablility of the obligor to repay based on his financials,  incomplete information, unmitigated risks,  inconsistencies, or areas of concern that may affect creditworthiness. Then, draft a response to the Credit Risk Manager, providing a clear approval or rejection decision along with justifications for the choice based on the identified issues or strengths in the FAM.',
    },
    
  ];

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle the dropdown
  };


  return (
    <div className="flex flex-col h-screen bg-gray-100 text-white">
      <div className="text-black p-2 text-left text-xl">FamBOT</div>

      <div className="absolute top-10 right-5 flex flex-col text-black z-10 space-y-2">
      {questions.map((question, index) => (
        <div key={index} className="flex flex-col space-y-1">
          <button
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg text- max-w-[400px] text-left"
            onClick={() => handleToggle(index)}
          >
            {question.title}
          </button>
          {activeIndex === index && (
            <div className="p-2 bg-gray-100 border border-gray-300 rounded-lg max-w-[300px]">
              <p
                className={`text-sm ${question.content.split(' ').length > 100 ? 'h-20 overflow-y-auto' : ''}`}
              >
                {question.content}
              </p>
              <button
                className="mt-2 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs"
                onClick={() => setInput(question.content)}
              >
                Select Question
              </button>
            </div>
          )}
        </div>
      ))}
    </div>


      <div className="flex flex-col h-full items-center lg:mx-[400px]">
        <div className="flex-grow w-full p-6 overflow-auto custom-scrollbar max-h-[calc(100vh-10rem)]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-3 p-3 rounded-lg w-fit max-w-sm ${
                msg.role === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'
              }`}
              style={{
                marginLeft: msg.role === 'user' ? 'auto' : 0,
                marginRight: msg.role === 'ai' ? 'auto' : 0,
              }}
              dangerouslySetInnerHTML={{ __html: formatMessageContent(msg.content) }}
            ></div>
          ))}
          {isLoading && (
            <div className="loading-dots self-start">
              <span className="text-3xl text-black">.</span>
              <span className="text-3xl text-black">.</span>
              <span className="text-3xl text-black">.</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Message Form */}
        <div className="flex flex-col w-full items-center justify-center">
          <form onSubmit={handleSubmit} className="py-1 px-2 w-5/6 bg-gray-900 rounded-2xl grid">
            <div className="flex rounded-lg border border-gray-700">
              <textarea
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow w-full overflow-hidden p-2 bg-transparent focus:outline-none"
                placeholder="Type your message..."
                disabled={isLoading || !fileUploaded}
                rows = {2}
                style={{
                  maxHeight: '100px', // Maximum height of the textarea
                  lineHeight: '1.5', // Line height for better readability
                }}
              />
              <button
                type="submit"
                className="p-2 bg-green-500 hover:bg-green-600 rounded-r-lg"
                disabled={isLoading || !fileUploaded}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-8 rotate-90"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* File Upload Form */}
        <div className="flex flex-col w-full items-center justify-center mt-4">
          <form onSubmit={handleUploadSubmit} className="sm:flex items-center">
            <div className="mt-2 text-black">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                disabled={isLoading || typing}
                className="p-2 bg-transparent text-black"
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg mt-2"
              disabled={isLoading || typing}
            >
              Upload PDF
            </button>
            {uploadError && <div className="text-red-500 mt-2">{uploadError}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
