const path = require('path'),
http = require('http'),
publicPath = path.join(__dirname,'../public/'),
express = require('express'),
socketIO = require('socket.io'),
app = express(),
port = process.env.PORT || 3000,
server = http.createServer(app),
io = socketIO(server),
{generateMessage,generateLocationMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected')
	socket.on('connect', () => {
		console.log('connected ---server');
	});

	socket.emit('newMessage', generateMessage('Admin',"Welcome to the chat app"));

	socket.broadcast.emit('newMessage',generateMessage('Admin', "new user joined"));

	socket.on('createMessage', (message,callback) => {
		io.emit('newMessage', generateMessage(message.from,message.text));
		callback('This is from server '+message.text);
	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin: ',coords.latitude, coords.longitude));
	})

	socket.on('disconnect', () => {
		console.log('disconnected ---server')	
	});
});

server.listen(port,()=>{
	console.log('app started on port '+port);
}) 