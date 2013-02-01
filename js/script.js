//Web worker (Mr. Checker)
var mr_checker = new Worker('mr_checker.js');
mr_checker.onmessage = function (event) {
	add_card(1, event.data);
};

//Web worker (Mr. Sender)
var mr_sender = new Worker('mr_sender.js');
mr_sender.onmessage = function (event) {
	if(event.data != 1 && event.data != 2 && event.data != 3)
		alert('Message sending failed!');
	document.getElementById('msg_box').value = 'Compose and edit messages here...';
};

//Function to start Google Voice login
function g_login() {
	var u_name = prompt('Enter your Google Voice account username bellow.', '');
	var p_word = prompt('Enter the password for specified account bellow.', '');
	alert('Will now attempt login with provided credentials...'+'\nUsername: '+u_name+'\nPassword: '+p_word+'\n\n\nBE PATIENT!');
	http = new XMLHttpRequest();
	http.open('GET','login.php?uname='+u_name+'&pass='+p_word,false);
	http.send();
	if(http.responseText == 'GOOD') {
		alert('Login successful!');
		document.getElementById('uname_in').value = u_name;
		document.getElementById('pass_in').value = p_word;
		mr_checker.postMessage(document.getElementById('uname_in').value+' '+document.getElementById('pass_in').value);
		set_victim();
	}
	else
		alert('Login failed! Check credentials');
}
//Function to set victim attributes
function set_victim() {
	alert('Please provide the following information...');
	document.getElementById('v1').innerHTML = prompt('Victim #1 name: ');
	document.getElementById('v1_num_in').value = prompt('Victim #1 phone number: ');
	document.getElementById('v1').innerHTML += ' ('+document.getElementById('v1_num_in').value+') Inbox';
	document.getElementById('v2').innerHTML = prompt('Victim #2 name: ');
	document.getElementById('v2_num_in').value = prompt('Victim #2 phone number: ');
	document.getElementById('v2').innerHTML += ' ('+document.getElementById('v2_num_in').value+') Inbox';
}
//Get current time
function get_time() {
	var ctime = new Date();
	var h = ctime.getHours();
	var m = ctime.getMinutes();
	var s = ctime.getSeconds();
	if (m < 10)
		m = '0' + m;
	return '(sent '+h+':'+m+':'+s+') ';
}
//Update the conversation table with sent messages
function update_sent(id, msg) {
	if(id == 1)
		mr_sender.postMessage('1|'+document.getElementById('uname_in').value+'|'+document.getElementById('pass_in').value+'|'+document.getElementById('v1_num_in').value+'|'+msg);
	else if(id == 3)
		mr_sender.postMessage('3|'+document.getElementById('uname_in').value+'|'+document.getElementById('pass_in').value+'|'+document.getElementById('v2_num_in').value+'|'+msg);
}
//Add new card to message queue
function add_card(id, sent) {
	if(id == 0) {
		var msg = document.getElementById('msg_box').value;
		var location = 'new_card';
	}
	else {
		var msg = sent;
		var location = 'dropContent';
	}
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id', 'box'+document.getElementById('div_count').value);
	newdiv.setAttribute('class', 'dragableBox');
	newdiv.setAttribute('order', document.getElementById('div_count').value+1);
	newdiv.innerHTML = msg;
	document.getElementById(location).appendChild(newdiv);
	var dragDropObj = new DHTMLgoodies_dragDrop();
	var i
	for(i=0; i<document.getElementById('div_count').value+1; i++) {
		try {
			if(document.getElementById('box'+i) != null)
				dragDropObj.addSource('box'+i,true,true,true,false,'onDragFunction');
		}
		catch(err) {}
	}
	dragDropObj.addTarget('dropBox','dropItems');
	dragDropObj.addTarget('dropBox2','dropItems');
	dragDropObj.addTarget('msg_box','dropItems');
	dragDropObj.addTarget('trash_can','dropItems');
	dragDropObj.init();
	document.getElementById('div_count').value = parseInt(document.getElementById('div_count').value)+1;
}
