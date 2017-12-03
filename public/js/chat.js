const socket = io();

function scrollToBottom(){
	const messages = $('#messages'),
	clientHeight = messages.prop('clientHeight'),
	newMessage = messages.children('li:last-child'),
	scrollTop = messages.prop('scrollTop'),
	scrollHeight = messages.prop('scrollHeight'),
	newMessageHeight = newMessage.innerHeight(),
	lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', () => {
	const params = $.deparam(window.location.search);
	socket.emit('join',params, (err) => {
		if(err){
			alert(err);
			window.location.href = '/'
		} else{
			console.log('No error');
		}
	});
});
socket.on('disconnect', () => {
	console.log('disconnected from server');
});

socket.on('updateUserList',function(users){
	let ol = $('<ol></ol>');

	users.forEach(function (user){
		ol.append($('<li></li>').text(user));
		$('#users').html(ol);
	})	
})

socket.on('newMessage', function(message){
	const formattedTime = moment(message.createdAt).format('h:mm a'),
				template = $('#message-template').html(),
				html = Mustache.render(template,{
					text:message.text,
					from:message.from,
					createdAt:formattedTime
				});

	$('#messages').append(html);
	scrollToBottom();
	// const li = $('<li></li>');
	// li.text(`${message.from} ${formattedTime}: ${message.text}`);
	// $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
	const formattedTime = moment(message.createdAt).format('h:mm a');
				template = $('#location-message-template').html(),
				html = Mustache.render(template,{
					text:message.text,
					from:message.from,
					createdAt:formattedTime
				});

	$('#messages').append(html);
	scrollToBottom();

	// const li = $('<li></li>'),
	// a = $('<a target="_blank">My Current Location</a>');
	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);
	// li.append(a);
	// $('#messages').append(li);
});

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