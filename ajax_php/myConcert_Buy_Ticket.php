<?php
include '../Classes/autoload.php';//uses autoload instead of manual includin each class->

// Must have connection for all PHP Handlers, creates $conn-----------------------------------------------
    global $conn; 
    $singeltone=ConnectDB::getInstance(); //creates connection $con;  //was deactivated in index.php
// END  Must have connection for all PHP Handlers, creates $conn-------------------------------------------

     $buyTicket = new Buy_Ticket();
	 $buyTicket ->Buy_Ticket_Action();

?>