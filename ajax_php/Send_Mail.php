<?php
include '../Classes/autoload.php';//uses autoload instead of manual includin each class->


	 $sendMail = new SendMail();
	 $sendMail ->generate_ticket_PDF_and_sendEmail();


?>