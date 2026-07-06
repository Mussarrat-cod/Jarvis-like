import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Search, Globe, Music, Clock, Code, Mail, Copy, Play, ChevronRight, Terminal, Volume2, Command, Sparkles, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = ({ onStartUsing }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [demoCommand, setDemoCommand] = useState('');
  const [demoResponse, setDemoResponse] = useState('');
  const [isDemoProcessing, setIsDemoProcessing] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDemoListening, setIsDemoListening] = useState(false);
  const demoRecognitionRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initialize demo speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      demoRecognitionRef.current = new SpeechRecognition();
      demoRecognitionRef.current.continuous = false;
      demoRecognitionRef.current.interimResults = true;
      demoRecognitionRef.current.lang = 'en-US';

      demoRecognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setDemoCommand(transcript);
        
        if (event.results[current].isFinal) {
          // Final result - process the command
          setIsDemoListening(false);
          simulateResponse(transcript);
        }
      };

      demoRecognitionRef.current.onerror = (event) => {
        console.error('Demo speech recognition error:', event.error);
        setIsDemoListening(false);
        
        let errorMessage = 'Speech recognition error. Please try again.';
        if (event.error === 'not-allowed') {
          errorMessage = 'Microphone access denied. Please allow microphone access and try again.';
        } else if (event.error === 'no-speech') {
          errorMessage = 'No speech detected. Please speak clearly and try again.';
        } else if (event.error === 'network') {
          errorMessage = 'Network error. Please check your internet connection.';
        }
        
        setDemoResponse(errorMessage);
      };

      demoRecognitionRef.current.onend = () => {
        setIsDemoListening(false);
      };
    } else {
      console.warn('Speech recognition not supported');
      setDemoResponse('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari for the best experience.');
    }
  }, []);

  const commands = {
    knowledge: [
      { command: "wikipedia [topic]", description: "Fetches and reads Wikipedia summary", example: "wikipedia Albert Einstein" }
    ],
    web: [
      { command: "open youtube", description: "Opens YouTube in browser", example: "open youtube" },
      { command: "open google", description: "Opens Google search", example: "open google" },
      { command: "open stackoverflow", description: "Opens Stack Overflow", example: "open stackoverflow" }
    ],
    entertainment: [
      { command: "play music", description: "Plays random songs from Music folder", example: "play music" }
    ],
    utilities: [
      { command: "the time", description: "Tells current time", example: "the time" }
    ],
    productivity: [
      { command: "open code", description: "Opens VS Code editor", example: "open code" }
    ],
    communication: [
      { command: "email", description: "Sends email via voice prompt", example: "email" }
    ]
  };

  const features = [
    { icon: Search, name: 'Wikipedia Search', desc: 'Instant knowledge lookup with voice commands' },
    { icon: Globe, name: 'Web Browser Control', desc: 'Open websites with simple voice commands' },
    { icon: Music, name: 'Music Player', desc: 'Play your favorite songs instantly' },
    { icon: Clock, name: 'Time & Date', desc: 'Get current time information' },
    { icon: Code, name: 'Code Editor Launcher', desc: 'Open your development tools' },
    { icon: Mail, name: 'Email Assistant', desc: 'Send emails with voice commands' }
  ];

  const simulateResponse = async (command) => {
    setIsDemoProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const input = command.toLowerCase().trim();
    let response = '';
    
    if (input.includes('wikipedia')) {
      response = 'According to Wikipedia, Albert Einstein was a German-born theoretical physicist who is widely held to be one of the greatest and most influential scientists of all time...';
    } else if (input.includes('youtube')) {
      try {
        const newWindow = window.open('https://www.youtube.com', '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          response = 'Please allow popups for this website to open YouTube. You can also click this link: <a href="https://www.youtube.com" target="_blank" style="color: #00E5FF;">Open YouTube</a>';
        } else {
          response = 'Opening YouTube for you now...';
        }
      } catch (error) {
        console.error('Error opening YouTube:', error);
        response = 'Could not open YouTube. Please check your popup settings and try again.';
      }
    } else if (input.includes('google')) {
      try {
        const newWindow = window.open('https://www.google.com', '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          response = 'Please allow popups for this website to open Google. You can also click this link: <a href="https://www.google.com" target="_blank" style="color: #00E5FF;">Open Google</a>';
        } else {
          response = 'Opening Google search...';
        }
      } catch (error) {
        console.error('Error opening Google:', error);
        response = 'Could not open Google. Please check your popup settings and try again.';
      }
    } else if (input.includes('stackoverflow')) {
      try {
        const newWindow = window.open('https://stackoverflow.com', '_blank', 'noopener,noreferrer');
        if (!newWindow) {
          response = 'Please allow popups for this website to open Stack Overflow. You can also click this link: <a href="https://stackoverflow.com" target="_blank" style="color: #00E5FF;">Open Stack Overflow</a>';
        } else {
          response = 'Opening Stack Overflow...';
        }
      } catch (error) {
        console.error('Error opening Stack Overflow:', error);
        response = 'Could not open Stack Overflow. Please check your popup settings and try again.';
      }
    } else if (input.includes('music')) {
      response = 'Playing some music for you...';
    } else if (input.includes('time')) {
      response = `The current time is ${currentTime.toLocaleTimeString()}`;
    } else if (input.includes('code')) {
      response = 'Opening your code editor...';
    } else if (input.includes('email')) {
      response = 'Preparing to send email... What would you like to say? You can speak your message after the beep.';
    } else {
      response = 'I\'m here to help! Try commands like "open youtube", "wikipedia quantum physics", "the time", or "play music".';
    }
    
    setDemoResponse(response);
    setIsDemoProcessing(false);
  };

  const handleDemoCommand = () => {
    if (!demoCommand.trim()) return;
    simulateResponse(demoCommand);
  };

  const copyCommand = (command) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(''), 2000);
  };

  const filteredCommands = Object.entries(commands).reduce((acc, [category, cmds]) => {
    const filtered = cmds.filter(cmd => 
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) acc[category] = filtered;
    return acc;
  }, {});

  const scrollToCommands = () => {
    document.getElementById('commands').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDemo = () => {
    document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartUsing = () => {
    if (onStartUsing) onStartUsing();
  };

  const startDemoListening = () => {
    if (demoRecognitionRef.current && !isDemoListening) {
      try {
        demoRecognitionRef.current.start();
        setIsDemoListening(true);
        setDemoCommand('Listening...');
        setDemoResponse('');
      } catch (error) {
        console.error('Error starting demo speech recognition:', error);
        setDemoResponse('Error starting speech recognition. Please try again.');
      }
    }
  };

  const stopDemoListening = () => {
    if (demoRecognitionRef.current && isDemoListening) {
      demoRecognitionRef.current.stop();
      setIsDemoListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-holo text-white relative">
      {/* Holographic Grid Background */}
      <div className="holographic-bg" />
      
      {/* Header with Live Time */}
      <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-holo z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold text-holo">Jarvis</span>
          </div>
          <div className="text-cyan-400 font-mono text-sm">
            {currentTime.toLocaleString()}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 flex flex-col items-center text-center"
          >
            <motion.div className="inline-flex items-center justify-center ai-core mb-6">
              <Mic className="w-8 h-8 text-ink" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-ink">
              Jarvis – Your Personal AI Assistant
            </h1>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-10">
              Control your system with voice. Fast, simple, powerful.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <button onClick={handleStartUsing} className="btn btn-primary">
                <Zap className="w-4 h-4" />
                Start Using
              </button>
              <button onClick={scrollToCommands} className="btn btn-secondary">
                <Command className="w-4 h-4" />
                View Commands
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2 text-ink">How It Works</h2>
              <p className="text-muted">Simple steps to get started</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1: Idle (Quiet styling) */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border border-line bg-panel flex items-center justify-center mb-6">
                  <Mic className="w-6 h-6 text-muted" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-ink">1. Click or Speak</h3>
                <p className="text-muted text-sm leading-relaxed">Activate the microphone or type a command</p>
              </div>

              {/* Step 2: Listening/Processing (Rotating AI Core) */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 ai-core flex items-center justify-center mb-6">
                  <Terminal className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-ink">2. Give Command</h3>
                <p className="text-muted text-sm leading-relaxed">Say or enter a command like 'open youtube'</p>
              </div>

              {/* Step 3: Action (Accent Border) */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border border-accent bg-bg-secondary flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-ink" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-ink">3. Instant Action</h3>
                <p className="text-muted text-sm leading-relaxed">Jarvis performs the action instantly</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Command Guide */}
      <section id="commands" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Command Guide</h2>
            <p className="text-slate-400 text-lg mb-8">All available voice and text commands</p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search commands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-blue-500/30 rounded-full focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {Object.entries({
              knowledge: { icon: Search, title: "🔍 Knowledge", color: "from-blue-600 to-cyan-600" },
              web: { icon: Globe, title: "🌐 Web Actions", color: "from-green-600 to-emerald-600" },
              entertainment: { icon: Music, title: "🎵 Entertainment", color: "from-purple-600 to-pink-600" },
              utilities: { icon: Clock, title: "⏰ Utilities", color: "from-orange-600 to-red-600" },
              productivity: { icon: Code, title: "💻 Productivity", color: "from-indigo-600 to-purple-600" },
              communication: { icon: Mail, title: "📧 Communication", color: "from-teal-600 to-blue-600" }
            }).map(([category, config]) => (
              filteredCommands[category] && (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${config.color} rounded-lg flex items-center justify-center`}>
                      <config.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{config.title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {filteredCommands[category].map((cmd, index) => (
                      <div key={index} className="group">
                        <div className="flex items-start gap-2">
                          <code className="flex-1 bg-slate-900/50 px-3 py-2 rounded-lg text-sm font-mono text-blue-300">
                            {cmd.command}
                          </code>
                          <button
                            onClick={() => copyCommand(cmd.command)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-700 rounded-lg"
                          >
                            {copiedCommand === cmd.command ? (
                              <div className="w-4 h-4 text-green-400">✓</div>
                            ) : (
                              <Copy className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        </div>
                        <p className="text-slate-400 text-sm mt-1 ml-2">{cmd.description}</p>
                        <p className="text-slate-500 text-xs mt-1 ml-2 italic">Example: "{cmd.example}"</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2 text-ink">Try It Now</h2>
              <p className="text-muted">Experience Jarvis in action</p>
            </div>

            <div className="flex gap-4 mb-8">
              <input
                type="text"
                placeholder="Type a command or use voice..."
                value={demoCommand}
                onChange={(e) => setDemoCommand(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleDemoCommand()}
                className="flex-1 bg-bg-secondary border border-line rounded-md text-ink px-4 focus:outline-none focus:border-accent-line transition-colors"
              />
              <button
                onClick={isDemoListening ? stopDemoListening : startDemoListening}
                className={`w-12 h-12 rounded-md flex items-center justify-center border transition-colors ${
                  isDemoListening ? 'bg-bg-secondary border-accent' : 'bg-panel border-line hover:border-line-strong'
                }`}
              >
                {isDemoListening ? <MicOff className="w-5 h-5 text-accent" /> : <Mic className="w-5 h-5 text-ink" />}
              </button>
              <button
                onClick={handleDemoCommand}
                className="btn btn-primary px-6"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Voice Status with Waveform */}
            {isDemoListening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 holo-status"
              >
                <div className="waveform">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="waveform-bar" />
                  ))}
                </div>
                <span className="text-sm text-accent ml-3">Listening... Speak clearly into your microphone</span>
              </motion.div>
            )}

            <div className="h-64 bg-bg-secondary rounded-md p-4 overflow-y-auto border border-line">
              <AnimatePresence>
                {demoResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-panel border border-line rounded-full flex items-center justify-center flex-shrink-0">
                        <Volume2 className="w-4 h-4 text-ink" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-1 text-ink">Jarvis</p>
                        <p className="text-muted typing-text" dangerouslySetInnerHTML={{ __html: demoResponse }}></p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {isDemoProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-muted rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-muted rounded-full animate-bounce delay-75" />
                    <div className="w-2 h-2 bg-muted rounded-full animate-bounce delay-150" />
                    <span className="text-muted ml-2">Processing...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['open youtube', 'the time', 'wikipedia space', 'play music'].map((example) => (
                <button
                  key={example}
                  onClick={() => {
                    setDemoCommand(example);
                    simulateResponse(example);
                  }}
                  className="px-3 py-1 bg-panel border border-line rounded-md text-sm hover:border-line-strong transition-colors hover:bg-bg-secondary text-ink"
                >
                  <Play className="inline w-3 h-3 mr-1 text-muted" />
                  {example}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Features</h2>
            <p className="text-slate-400 text-lg">Everything Jarvis can do for you</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300 text-center group"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Instructions */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">How to Use Jarvis Properly</h2>
            <p className="text-slate-400 text-lg">Follow these guidelines for best experience</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Mic, title: "Speak Clearly", desc: "Use clear pronunciation and moderate pace" },
              { icon: Command, title: "Use Exact Commands", desc: "Follow the command format exactly as shown" },
              { icon: Shield, title: "Enable Permissions", desc: "Allow microphone access when prompted" },
              { icon: Zap, title: "Keep Commands Simple", desc: "Short and direct commands work best" }
            ].map((instruction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <instruction.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{instruction.title}</h3>
                  <p className="text-slate-400 text-sm">{instruction.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 p-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Important Notes</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>Works best on desktop with microphone enabled</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>Requires Python backend running for full functionality</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>Music plays from local Music folder only</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>Internet connection required for web features</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                <span>Email requires Gmail configuration with app password</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-blue-500/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">Jarvis AI Assistant</span>
          </div>
          <p className="text-slate-400 text-sm mb-2">Created with ❤️ for personal productivity</p>
          <div className="flex items-center justify-center gap-4 text-sm text-slate-500">
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>Powered by React & Python</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
