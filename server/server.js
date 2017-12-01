const path = require('path'),
http = require('http'),
publicPath = path.join(__dirname,'../public/'),
express = require('express'),
socketIO = require('socket.io'),
app = express(),
port = process.env.PORT || 3000,
server = http.createServer(app),
io = socketIO(server),
{generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected')
	socket.on('connect', () => {
		console.log('connected ---server');
	});

	socket.emit('newMessage', generateMessage('Admin',"Welcome to the chat app"));

	socket.broadcast.emit('newMessage',generateMessage('Admin', "new user joined"));

	socket.on('createMessage', message => {
		io.emit('newMessage', generateMessage(message.from,message.text))		
	});

	socket.on('disconnect', () => {
		console.log('disconnected ---server')	
	});
});

server.listen(port,()=>{
	console.log('app started on port '+port);
}) 