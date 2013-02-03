//Sort data
onmessage = function (event) {
	var data = event.data.split(' ');
	check_msg(data[0], data[1]);
}

//Check for new messages
function check_msg(uname, pass) {
	http = new XMLHttpRequest();
	http.open('GET','../check.php?uname='+uname+'&pass='+pass,false);
	http.send();
	//Send response back
	if(http.responseText != '')
		postMessage(http.responseText);
	setTimeout('check_msg("'+uname+'","'+pass+'")',5000);
}
