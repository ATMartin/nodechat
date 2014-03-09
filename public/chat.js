window.onload = function() {
	var messages = [];
	var socket = io.connect('http://jdh-blackwater-nodejs-90087.use1.nitrousbox.com');
	var field = document.getElementById("field");
	var sendButton = document.getElementById("send");
	var content = document.getElementById("content");
	var name = document.getElementById("name");
	
	socket.on('message', function (data) {
		if(data.message) {
			messages.push(data);
			var html='';
			for(var i=0; i < messages.length; i++) {   // <-- This for-i loop: why not a for-each instead? 
			//for (var c in messages) {
				html += '<b>' + (messages[i].username ? messages[i].username : 'OP') + ': </b>' + messages[i].message + '<br />';
			}
			content.innerHTML = html;
			content.scrollTop = content.scrollHeight;
		} else {
			console.log("Error with adding message. Dump: ", data);
		}
	});
	
	sendButton.onclick = function() {
		if (name.value == '') { alert('Please enter a username!'); }
		else {
			console.log("Sending " + field.value + "via socket " + socket);
			socket.emit('send', {message: field.value, username: name.value });
			field.value = '';
		}
	}

	field.onkeyup= function(e) {
		var charCode = e.which || e.keyCode;
		if (charCode == '13') {
			sendButton.click()
			return false;
		}
	}	
}
