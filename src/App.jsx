import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, Clock, Globe, Mail, Music, Code, Search, MessageSquare, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './LandingPage';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLanding, setShowLanding] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal) {
          // Final result - process the command
          setIsListening(false);
          processCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        let errorMessage = 'Speech recognition error. Please try again.';
        if (event.error === 'not-allowed') {
          errorMessage = 'Microphone access denied. Please allow microphone access and try again.';
        } else if (event.error === 'no-speech') {
          errorMessage = 'No speech detected. Please speak clearly and try again.';
        } else if (event.error === 'network') {
          errorMessage = 'Network error. Please check your internet connection.';
        }
        
        setResponse(errorMessage);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn('Speech recognition not supported');
      setResponse('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setTranscript('Listening...');
        setResponse('');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setResponse('Error starting speech recognition. Please try again.');
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processCommand = async (command) => {
    setIsProcessing(true);
    try {
      const response = await simulateJarvisResponse(command);
      setResponse(response);
      setMessages(prev => [...prev, { type: 'user', text: command }, { type: 'jarvis', text: response }]);
    } catch (error) {
      setResponse('Sorry, I encountered an error processing your request.');
    } finally {
      setIsProcessing(false);
      setTranscript('');
    }
  };

  const simulateJarvisResponse = async (userInput) => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const input = userInput.toLowerCase().trim();
    
    if (input.includes('wikipedia')) {
      return 'I found some information on Wikipedia about that topic. Let me search for you...';
    } else if (input.includes('youtube')) {
      try {
        const newWindow = window.open('https://www.youtube.com', '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          return 'Please allow popups for this website to open YouTube. You can also click this link: <a href="https://www.youtube.com" target="_blank" style="color: #00E5FF;">Open YouTube</a>';
        }
        return 'Opening YouTube for you now...';
      } catch (error) {
        console.error('Error opening YouTube:', error);
        return 'Could not open YouTube. Please check your popup settings and try again.';
      }
    } else if (input.includes('google')) {
      try {
        const newWindow = window.open('https://www.google.com', '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          return 'Please allow popups for this website to open Google. You can also click this link: <a href="https://www.google.com" target="_blank" style="color: #00E5FF;">Open Google</a>';
        }
        return 'Opening Google search...';
      } catch (error) {
        console.error('Error opening Google:', error);
        return 'Could not open Google. Please check your popup settings and try again.';
      }
    } else if (input.includes('stackoverflow')) {
      try {
        const newWindow = window.open('https://stackoverflow.com', '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          return 'Please allow popups for this website to open Stack Overflow. You can also click this link: <a href="https://stackoverflow.com" target="_blank" style="color: #00E5FF;">Open Stack Overflow</a>';
        }
        return 'Opening Stack Overflow...';
      } catch (error) {
        console.error('Error opening Stack Overflow:', error);
        return 'Could not open Stack Overflow. Please check your popup settings and try again.';
      }
    } else if (input.includes('music')) {
      return 'Playing some music for you...';
    } else if (input.includes('time')) {
      return `The current time is ${currentTime.toLocaleTimeString()}`;
    } else if (input.includes('code')) {
      return 'Opening your code editor...';
    } else if (input.includes('email')) {
      return 'Preparing to send email... What would you like to say? You can speak your message after the beep.';
    } else {
      return 'I\'m here to help! You can ask me to open websites, search Wikipedia, tell you the time, play music, or send emails.';
    }
  };

  const handleTextCommand = (text) => {
    if (!text.trim()) return;
    
    setTranscript(text);
    setIsProcessing(true);
    
    simulateJarvisResponse(text).then(response => {
      setResponse(response);
      setMessages(prev => [...prev, { type: 'user', text }, { type: 'jarvis', text: response }]);
      setIsProcessing(false);
      setTranscript('');
    });
  };

  if (showLanding) {
    return <LandingPage onStartUsing={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-holo text-white relative">
      {/* Holographic Grid Background */}
      <div className="holographic-bg" />
      
      {/* Navigation */}
      <header className="bg-slate-950/80 backdrop-blur-md border-holo relative z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={() => setShowLanding(true)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors hover:scale-105"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div className="text-cyan-400 font-mono text-sm">
            {currentTime.toLocaleString()}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="holo-title">
            Jarvis Assistant
          </h1>
          <p className="holo-subtitle">Your intelligent voice companion</p>
        </motion.header>

        {/* Main Interface */}
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Voice Control Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="jarvis-card"
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-holo">
              <Volume2 className="text-cyan-400" />
              Voice Control
            </h2>
            
            <div className="flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isListening ? stopListening : startListening}
                className={`holo-mic-button ${isListening ? 'listening' : ''}`}
              >
                {isListening ? (
                  <MicOff className="w-12 h-12 text-white" />
                ) : (
                  <Mic className="w-12 h-12 text-white" />
                )}
              </motion.button>
              
              <p className="mt-4 text-slate-300">
                {isListening ? 'Listening... Click to stop' : 'Click to start listening'}
              </p>
              
              {/* Voice Status with Waveform */}
              {isListening && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 holo-status w-full"
                >
                  <div className="waveform justify-center">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <div key={i} className="waveform-bar" />
                    ))}
                  </div>
                  <span className="text-sm text-cyan-300 text-center">Listening... Speak clearly into your microphone</span>
                </motion.div>
              )}
              
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-slate-700/50 rounded-lg w-full"
                >
                  <p className="text-sm text-slate-300">You said: {transcript}</p>
                </motion.div>
              )}
            </div>

            {/* Text Input */}
            <div className="mt-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a command..."
                  className="jarvis-input flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleTextCommand(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.querySelector('input[type="text"]');
                    if (input.value) {
                      handleTextCommand(input.value);
                      input.value = '';
                    }
                  }}
                  className="jarvis-button p-3"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Response Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="jarvis-card"
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-holo">
              <MessageSquare className="text-cyan-400" />
              Jarvis Response
            </h2>
            
            <div className="h-96 overflow-y-auto space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={message.type === 'user' ? 'holo-chat-user' : 'holo-chat-jarvis'}
                  >
                    <p className="text-sm font-semibold mb-1">
                      {message.type === 'user' ? 'You' : 'Jarvis'}
                    </p>
                    <p className="text-slate-300" dangerouslySetInnerHTML={{ __html: message.text }}></p>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-75" />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-150" />
                  </div>
                    <p className="text-slate-400 mt-2">Processing...</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;
