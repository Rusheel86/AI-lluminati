// server.js - Fixed filter version
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Improved toxicity filter
function filterMessage(msg) {
    const badWords = [
        "shit", "fuck", "asshole", "bitch", "bastard",
        "kill myself", "suicide", "self harm", "hurt myself"
    ];
    
    try {
        if (!msg || msg.trim().length === 0) return false;
        if (msg.length > 500) return false;
        
        const lowerMsg = msg.toLowerCase();
        
        // Check for exact word matches or phrases
        const containsBadWord = badWords.some(badWord => {
            // For multi-word phrases, check the exact phrase
            if (badWord.includes(" ")) {
                return lowerMsg.includes(badWord);
            }
            // For single words, check for exact word boundaries
            const words = lowerMsg.split(/\s+/);
            return words.some(word => word === badWord);
        });
        
        return !containsBadWord;
    } catch (error) {
        console.error("Error filtering message:", error);
        return false;
    }
}

const app = express();
app.use(cors());
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

// Basic route to test if server is working
app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>PeerPods Server</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                h1 { color: #333; }
            </style>
        </head>
        <body>
            <h1>PeerPods Server is running! ?</h1>
            <p>Go to <a href="/chat.html">/chat.html</a> for the chat interface.</p>
        </body>
        </html>
    `);
});

// Socket.io connection handling
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("chat message", async (msg) => {
        console.log("Message received:", msg);
        const safe = filterMessage(msg);
        console.log("Message safe:", safe);

        if (!safe) {
            socket.emit("warn", "Message contains inappropriate content");
            console.log("Message blocked:", msg);
            return;
        }

        io.emit("chat message", msg);
        console.log("Message broadcasted:", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});

console.log("Server started successfully!");
