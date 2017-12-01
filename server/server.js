const path = require('path'),
http = require('http'),
publicPath = path.join(__dirname,'../public/'),
express = require('express'),
socketIO = require('socket.io'),
app = express(),
port = process.env.PORT || 3000,
server = http.createServer(app),
io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected')
	socket.on('connect', () => {
		console.log('connected ---server')	
	});

	socket.emit('newMessage',{
		from:'dsfa',
		text:'dsfa',
		createdAt:new Date().getTime()
	});

	socket.on('createMessage', message => {
		console.log('createMessage', message)
	})

	socket.on('disconnect', () => {
		console.log('disconnected ---server')	
	});
});

server.listen(port,()=>{
	console.log('app started on port '+port);
}) 