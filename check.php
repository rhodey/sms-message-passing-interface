<?php
include('GoogleVoice.php');

//Bad request
if(empty($_GET['uname']) || empty($_GET['pass']))
	exit();

//Get unread SMS
$gv = new GoogleVoice($_GET['uname'], $_GET['pass']);
$sms = $gv->getNewSMS();

//Feed available
if($sms) {
	//Echo new message
	preg_match('/\+1([0-9]{3})([0-9]{3})([0-9]{4})/', $sms[count($sms)-1]['phoneNumber'], $match);
	echo '('.$match[1].') '.$match[2].'-'.$match[3].': '.$sms[count($sms)-1]['message'];

	//Mark conversation as read
	$gv->markSMSRead($sms[count($sms)-1]['msgID']);
}
?>
