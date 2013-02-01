//Sort data
onmessage = function (event) {
	var data = event.data.split('|');
	check_msg(data[0], data[1], data[2], data[3], data[4]);
}

//Send message to recipients
function check_msg(num ,uname, pass, recipients, msg) {
	http = new XMLHttpRequest();
	http.open('GET','send.php?uname='+uname+'&pass='+pass+'&recipients='+recipients+'&message='+msg,false);
	http.send();
	//Send result back
	if(http.responseText == 'GOOD')
		postMessage(num);
	else
		postMessage('FAIL');
}
