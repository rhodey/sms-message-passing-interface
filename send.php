<?php
include('GoogleVoice.php');

// Bad request.
if(empty($_GET['uname']) || empty($_GET['pass']) || empty($_GET['recipients']) || empty($_GET['message']))
	exit();

// Send message to recipients.
$gv = new GoogleVoice($_GET['uname'], $_GET['pass']);
if($gv->sendSMS($_GET['recipients'], $_GET['message']))
	echo 'GOOD';
?>
