
@'# PeerPods - AI-Moderated Peer Support Chat

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A real-time, AI-moderated chat application designed for safe peer-to-peer support conversations. PeerPods automatically filters inappropriate content to maintain a supportive environment for mental health discussions.

## 🌟 Features

- **Real-time Chat**: Instant messaging with WebSocket connections
- **AI Content Moderation**: Automatic filtering of inappropriate language
- **Anonymous Support**: Focus on conversation content rather than identities
- **Mental Health Safe**: Specialized filtering for sensitive topics
- **Multi-user Support**: Connect with multiple users simultaneously
- **Warning System**: Immediate feedback for flagged messages

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PeerPods
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Server status: http://localhost:3000
   - Chat interface: http://localhost:3000/chat.html

### Production Deployment
```bash
npm start
```

## 🏗️ Project Structure

```
PeerPods/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── package-lock.json      # Locked dependencies
├── public/
│   └── chat.html          # Chat interface
└── README.md              # This file
```

## 🔧 Technical Details

### Built With
- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.io
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **CORS Handling**: cors middleware

### Content Moderation
The AI moderation system blocks messages containing:
- Profanity and offensive language
- Harmful mental health content
- Excessively long messages (>500 characters)
- Empty messages

### API Endpoints
- `GET /` - Server status page
- `GET /chat.html` - Chat interface
- WebSocket events for real-time communication

## 💬 How It Works

1. **Join a Pod**: Users connect to the chat interface
2. **Send Messages**: Type and send messages in real-time
3. **AI Moderation**: Each message is scanned for inappropriate content
4. **Safe Delivery**: Only approved messages are broadcast to all users
5. **Warnings**: Flagged messages trigger immediate user feedback

## 🛡️ Safety Features

- **Word Filtering**: Blocks specific inappropriate terms
- **Context Awareness**: Mental health-sensitive filtering
- **Length Limits**: Prevents spam and excessive messages
- **Real-time Monitoring**: Instant content analysis

## 🎯 Use Cases

- **Peer Support Groups**: Safe spaces for mental health discussions
- **Educational Settings**: Moderated student conversations
- **Community Forums**: Civil discourse enforcement
- **Crisis Support**: Immediate peer-to-peer assistance

## 🔄 Development

### Available Scripts
```bash
npm run dev      # Start with nodemon (auto-restart)
npm start        # Start production server
npm test         # Run tests (placeholder)
```

### Customizing Moderation
Edit the `filterMessage` function in `server.js` to modify:
- Banned word list
- Message length limits
- Specialized filtering rules


### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing GitHub issues
2. Create a new issue with detailed information
3. Include steps to reproduce the problem



**PeerPods** - Creating safer conversations, one message at a time. 💬✨


