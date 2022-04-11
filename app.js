const express = require('express');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const cool = require('cool-ascii-faces');

const PORT = process.env.PORT || 4000;
const INDEX = '/index.html';

const app = express();
app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
//   }));
//API ADDED HERE---------
app.get('/servertime', (req, res) => res.send(getTimes()))
app.get('/cool', (req, res) => res.send(cool()))
getTimes = () => {
    let result = 'OK';
    // const times = dotenv.TIMES || 5;
    // for (i = 0; i < times; i++) {
    //   result += i + ' ';
    // }
    result   = result +'--> '+ new Date().toTimeString(); 
    return result;
  }
//-------------------------------
var routes = require('./src/routes/user_route'); //importing route
routes(app); //register the route
//SOCKET IO ADDED HERE-----------
const server = app
// .set('views', path.join(__dirname, 'views'))
.set('view engine', 'ejs')
.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
.listen(PORT, ()=> {
    console.log('Server is listening on',PORT);
});
const io = socketIO(server);
const connectedUser = new Set();

io.on('connection', (socket) => {
    setInterval(() => io.emit('time-interval', new Date().toTimeString()), 1000);
    console.log('Connected-ID-->',socket.id);
    connectedUser.add(socket.id);
    // socket.broadcast.emit('connected-user',connectedUser.size);
    socket.emit('broadcast', connectedUser.size);
    // io.emit('broadcast', connectedUser.size);

    socket.on('disconnect',()=>{
        console.log('Disconnected-ID-->',socket.id);
        connectedUser.delete(socket.id);
        socket.broadcast.emit('connected-user',connectedUser.size);
    });

    socket.on('message',(data)=>{
        console.log('Message---->',data);
        // socket.emit('message-receive',data);
        // io.emit('connected-user',data);
        socket.broadcast.emit('message-received',data);

// socket.emit('request', /* … */); // emit an event to the socket
// io.emit('broadcast', /* … */); // emit an event to all connected sockets
// socket.on('reply', () => { /* … */ }); // listen to the event
    });
});
