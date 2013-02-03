<?php
include('GoogleVoice.php');

// Bad request.
if(empty($_GET['uname']) || empty($_GET['pass']))
	exit();

// Get all unread SMSs from your Google Voice Inbox.
$gv = new GoogleVoice($_GET['uname'], $_GET['pass']);
$sms = $gv->getUnReadSMS();

// Read all the new messages.
foreach($sms as $s) {
	echo $s->phoneNumber.': '.$s->messageText;
	$gv->markMessageRead($s->id);
}
?>
