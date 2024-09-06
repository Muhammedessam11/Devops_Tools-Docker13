const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const redis = require('redis');

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/chat-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Redis client
const redisClient = redis.createClient({
    host: 'redis',
    port: 6379
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

// MongoDB schema and model for messages
const messageSchema = new mongoose.Schema({
    user: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Load previous chat messages from MongoDB
    Message.find().limit(10).sort({ timestamp: -1 }).exec((err, messages) => {
        if (err) throw err;
        socket.emit('load old messages', messages);
    });

    // When a new message is received
    socket.on('chat message', (data) => {
        const newMessage = new Message({
            user: data.user,
            message: data.message
        });

        newMessage.save((err) => {
            if (err) throw err;
            io.emit('chat message', data);
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
