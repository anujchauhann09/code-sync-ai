import 'dotenv/config';

import http from 'http'; // socket.io easily integrate with http module server
import app from './app.js';

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

