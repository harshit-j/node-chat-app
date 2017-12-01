const socket = io();
socket.on('connect', () => {
	console.log('Connected to server');
});
socket.on('disconnect', () => {
	console.log('disconnected from server')
});

socket.on('newMessage', function(message){
	console.log('New message',message);
	var li = $('<li></li>');
	li.text(`${message.from} ${message.text}`);
	$('#messages').append(li);
});

$('#message-form').on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage', {
		from:'User',
		text:$('#message-form input').val()
	}, (data) => {
	console.log('Got it. ' + data);
	})
	
})