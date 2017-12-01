const socket = io();
socket.on('connect', () => {
	console.log('Connected to server');
	socket.emit('createEmail', {
		to:'sdfsaf'
	})
});
socket.on('disconnect', () => {
	console.log('disconnected from server')
});

socket.on('newMessage', function(message){
	console.log('New message',message)
});

socket.emit('createMessage',{
	from:"asfd",
	text:"asfsfsdf"
})