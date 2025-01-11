import 'dotenv/config';

import http from 'http'; // socket.io easily integrate with http module server
import app from './app.js';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server);

io.use((socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];

        if(!token) {
            return next(new Error('Authentication error'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return next(new Error('Authentication error'));
        }

        socket.user = decoded;

        next();
    } catch (error) {
        console.log(error);
        next(error); // next() is same as express middleware-if next call with error then socket will not connect
    }
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('event', data => {

    });

    socket.on('disconnect', () => {

    });
}); // socket/client

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

