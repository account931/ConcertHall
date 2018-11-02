<?php
include '../Classes/autoload.php';//uses autoload instead of manual includin each class->

// Must have connection for all PHP Handlers, creates $conn-----------------------------------------------
    global $conn; 
    $singeltone=ConnectDB::getInstance(); //creates connection $con;  //was deactivated in index.php
// END  Must have connection for all PHP Handlers, creates $conn-------------------------------------------

     $buyTicket = new Buy_Ticket();
	 $buyTicket ->Buy_Ticket_Action(); //insert ticket info into SQL
	 
	 
	 //Adds a booked ticket to php Cookies(instead of using ajax_php/Cookie_Busket_Add.php)
     //$cookie = new MyCookie();
	 //$cookie ->add_to_cookies(); 
	 
	 
	 //$sendMail = new SendMail();
	 //$sendMail ->generate_ticket_PDF_and_sendEmail();


?>