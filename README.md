# Jarvis Voice Assistant - Web Frontend

A modern, interactive web interface for the Jarvis voice assistant built with React, Tailwind CSS, and Framer Motion.

## Features

### Voice Control
- **Voice Input**: Click the microphone button to give voice commands
- **Real-time Feedback**: Visual indicators when listening and processing
- **Audio Processing**: Captures and processes voice commands

### Text Input
- **Type Commands**: Alternative text-based command input
- **Quick Actions**: Send button for instant command execution
- **Keyboard Support**: Press Enter to send commands

### Interactive Interface
- **Modern UI**: Beautiful gradient design with smooth animations
- **Response History**: Chat-like interface showing conversation history
- **Real-time Clock**: Live time display in the header
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Capabilities
- 🔍 **Wikipedia Search**: Search Wikipedia articles
- 🌐 **Web Browser**: Open websites (YouTube, Google, StackOverflow)
- 🎵 **Music Player**: Play music from your collection
- ⏰ **Time & Date**: Get current time information
- 💻 **Code Editor**: Open VS Code or other editors
- 📧 **Email Assistant**: Send emails via voice commands

## Getting Started

### Prerequisites
- Node.js 16+ installed
- Modern web browser with microphone support

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## Usage

### Voice Commands
1. Click the microphone button to start listening
2. Speak your command clearly
3. Click again to stop recording
4. Jarvis will process and respond

### Supported Commands
- **"Search Wikipedia for [topic]"** - Search Wikipedia
- **"Open YouTube"** - Open YouTube website
- **"Open Google"** - Open Google search
- **"Open Stack Overflow"** - Open Stack Overflow
- **"Play music"** - Play music from your library
- **"What time is it?"** - Get current time
- **"Open code editor"** - Open VS Code
- **"Send email"** - Compose and send email

### Text Commands
Type commands directly in the text input field and press Enter or click Send.

## Backend Integration

This frontend is designed to work with the Python Jarvis backend. To connect with the backend:

1. **Start the Python Backend**
   ```bash
   python jarvis.py
   ```

2. **API Integration** (Future Enhancement)
   - The frontend includes placeholder functions for API integration
   - Replace the `simulateJarvisResponse` function with actual API calls
   - Implement real-time audio processing with the Python backend

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast development build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

## File Structure

```
jarvis-frontend/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS styles
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── README.md           # This file
```

## Customization

### Colors
The theme uses a custom "jarvis" color palette. Modify `tailwind.config.js` to customize colors.

### Features
Add new capabilities by:
1. Adding new features to the `features` array in `App.jsx`
2. Implementing corresponding logic in the response handler
3. Adding appropriate icons from Lucide React

### Animations
Customize animations using Framer Motion. Modify the `motion` components in `App.jsx`.

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Permissions

The app requires microphone access for voice commands. Grant permission when prompted by your browser.

## Security Notes

- The frontend uses the Web Audio API for microphone access
- Audio is processed locally in the browser
- No audio data is sent to external servers in the current implementation
- Future backend integration should include proper authentication and encryption

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
