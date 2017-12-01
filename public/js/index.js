const socket = io();
socket.on('connect', () => {
	console.log('Connected to server');
});
socket.on('disconnect', () => {
	console.log('disconnected from server')
});

socket.on('newMessage', function(message){
	console.log('New message',message);
	const li = $('<li></li>');
	li.text(`${message.from} ${message.text}`);
	$('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
	const li = $('<li></li>'),
	a = $('<a target="_blank">My Current Location</a>');
	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	$('#messages').append(li);
})

const messageTextBox = $('[name=message]');
$('#message-form').on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage', {
		from:'User',
		text:messageTextBox.val()
	}, () => {
		messageTextBox.val('');
	})
	
});

const locationButton = $('#send-location');
locationButton.on('click',function(e) {
if(!navigator.geolocation){
	return alert('geolocation not supported by your browser')
}
locationButton.attr('disabled','disabled').text('Sending location...');
navigator.geolocation.getCurrentPosition(function (position) {
	locationButton.removeAttr('disabled').text('Send Location');
	socket.emit('createLocationMessage', {
		latitude: position.coords.latitude,
		longitude: position.coords.longitude,
	},)
}, function(){
	locationButton.removeAttr('disabled').text('Send Location');
	alert('unable to fetch location')
})
})