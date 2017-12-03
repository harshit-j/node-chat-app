const path = require('path'),
	    http = require('http'),
	    publicPath = path.join(__dirname, '../public/'),
	    express = require('express'),
	    socketIO = require('socket.io'),
	    app = express(),
	    port = process.env.PORT || 3000,
	    server = http.createServer(app),
	    io = socketIO(server),
	    { Users } = require('./utils/users'),
	    users = new Users(),
	    { generateMessage, generateLocationMessage } = require('./utils/message'),
	    { isRealString } = require('./utils/validation');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.on('connect', () => {
        console.log('connected ---server');
    });

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
	    	users.addUser(socket.id, params.name, params.room);

	    	io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        //socket.leave('The Office Fans');
        //io.emit -> io.to('The Offie Fans').emit
        //socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit

        socket.emit('newMessage', generateMessage('Admin',
            'Welcome to the Chat app'));
        socket.broadcast.to(params.room).emit('newMessage',
            generateMessage('Admin', `${params.name} joined`));
        callback()
    });

    socket.emit('newMessage', generateMessage('Admin', "Welcome to the chat app"));

    socket.broadcast.emit('newMessage', generateMessage('Admin', "new user joined"));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })

    socket.on('disconnect', () => {
        console.log('disconnected ---server');
        const user = users.removeUser(socket.id);
        if(user){
        	io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        	io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

server.listen(port, () => {
    console.log('app started on port ' + port);
})