<?php
include '../Classes/autoload.php';//uses autoload instead of manual includin each class->

// Must have connection for all PHP Handlers, creates $conn-----------------------------------------------
    global $conn; 
    $singeltone=ConnectDB::getInstance(); //creates connection $con;  //was deactivated in index.php
// END  Must have connection for all PHP Handlers, creates $conn-------------------------------------------

     $UnixSt = strtotime('+1 day', strtotime(date('d-m-Y')));  //today Unixstamp  date("Y-m-d"   //('3-10-2018')
     
	 //Start SELECT ALL Venues whick date is greater than today
	 $event = new Select_Events();
	 $event->select_Events_Values($UnixSt);
	 

?>