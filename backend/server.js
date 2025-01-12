import 'dotenv/config';

import http from 'http'; // socket.io easily integrate with http module server
import app from './app.js';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './models/project.model.js';

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.use( async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        const projectId = socket.handshake.query.projectId;

        if(!token) {
            return next(new Error('Authentication error'));
        }

        if(!projectId) {
            return next(new Error('Project error'));
        }
        else if(!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid projectId'));
        }

        socket.project = await projectModel.findById(projectId);

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
    socket.roomId = socket.project._id.toString();

    console.log('User connected');

    socket.join(socket.roomId);

    // socket.on('event', data => {

    // });

    socket.on('project-message', data => { //  data is in Object form
        console.log(data);

        socket.broadcast.to(socket.roomId).emit('project-message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        socket.leave(socket.roomId);
    });
}); // socket/client

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

