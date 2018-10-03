<?php
include '../Classes/autoload.php';//uses autoload instead of manual includin each class->

// Must have connection for all PHP Handlers, creates $conn-----------------------------------------------
    global $conn; 
    $singeltone=ConnectDB::getInstance(); //creates connection $con;  //was deactivated in index.php
// END  Must have connection for all PHP Handlers, creates $conn-------------------------------------------

     $UnixSt = strtotime('+1 day', strtotime('3-10-2018'));
     
	 $event = new Select_Events();
	 $event->select_Events_Values($UnixSt);
	 

?>