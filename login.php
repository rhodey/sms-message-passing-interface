<?php
include('GoogleVoice.php');

// Attempt login
$gv = new GoogleVoice($_GET['uname'], $_GET['pass']);
$login = $gv->checkLogin();
if($login)
	echo 'GOOD';
?>
