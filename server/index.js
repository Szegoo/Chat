const express = require('express');
const http = require('http');
var bodyParser = require('body-parser')
const next = require('next');
const socketio = require('socket.io');
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
const chats = [{ chatName: "Samo za gospodine", host: "Sinak" }];

nextApp.prepare().then(async () => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    const server = http.createServer(app);
    const io = new socketio.Server();
    io.attach(server);
    io.on('connection', socket => {
        socket.on('message', (message) => {
            switch (message.text) {
                case ":smile":
                    io.emit('message' + message.id, `${message.name} said 😄 `)
                    break;
                case ":cow":
                    io.emit('message' + message.id, `${message.name} said 🐮`)
                    break;
                case ":ok":
                    io.emit('message' + message.id, `${message.name} said 👍`)
                    break;
                default:

                    io.emit('message' + message.id, `${message.name} said ${message.text} `)
            }
        });
        socket.on('connection', (name) => {
            io.emit("connection", `${name} joind the room!`);
        });
        socket.on('disconnect', () => {
            io.emit('left', socket.id + ' disconnect');
        });
        socket.on('audio', (data) => {
            io.emit('audio' + data.id, data.dataURL);
        })
    })
    app.get('/api/get-chats', (req, res) => {
        res.json({ chats });
    })
    app.post('/api/create-chat', (req, res) => {
        const { host, chatName } = req.body;
        chats.push({ host, chatName });
        res.json({ success: true });
    })
    app.all("*", (req, res) => nextHandler(req, res));

    server.listen(port, () => {
        console.log('Listening on ' + port);
    })
})
