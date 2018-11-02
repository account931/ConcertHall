<?php
//NOT USED AT ALL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Class MyCookie
{

 //$_COOKIES are  stored in JSON format
 //if u need to add a new array to $_COOKIES, 1stly create an array from it {json_decode($_COOKIE['myTicketList'])}, push new array and {json_encode()} it back
   
   public $CookieTimeMonth;
   
   public function __construct() {
        $this->CookieTimeMonth = 86400 * 30;
    }
  
  //public $CookieTimeMonth = 86400 * 30; // 86400 = 1 day
  
  
  
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
  public function setCookie() //there si some problem with 1st Cookie creation, it creates a NULL cookie and therefore later we can't push array to it
  {
	  //setcookie('myTicketList', '', time()-3600 );  //delete all prev
	  //$b = array();
	  $b = array('test', 'true');
      if(!isset($_COOKIE['myTicketList'])) {
          setcookie('myTicketList', json_encode($b),  time() + $this->CookieTimeMonth, "/" );
          //$_COOKIE['myTicketList'] = json_encode($b);
     // }
      
	  //$data = array(); $bc = array();
	  $data = json_decode($_COOKIE['myTicketList']/*, true*/);  ///*, true*/ screwed everything
	  $bc = array('RiverPort', 'Mefjus'); 
	  array_push($data, $bc);  //just an attificial fix as Cookie creation fails without it
	
	  
	  setcookie('myTicketList', json_encode($data),  time() + $this->CookieTimeMonth, "/" );  //(86400 * 30) // 86400 = 1 day
  }
  }
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
  
  

  
  //counts ticket in php cookies to dispay in round badge top right
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
  public function count() 
  {
	 $quantity = 0;
     $quantity = count(json_decode( $_COOKIE['myTicketList'] )) ;
	 
	 $ticketQuantities = array( "q"=> $quantity);  //array to output in json
	 echo json_encode($ticketQuantities);  //BACK
	  
 
  }
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
   
   



   
   
  //adds a new booked ticked to php cookies, triggered from js/myConcert.js/run_ajax_to_Buy_Ticket()->ajax_php/myConcert_Buy_Ticket.php->Classes/Buy_Ticket.php->Buy_Ticket_Action()
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
  public function add_to_cookies() 
  {
	 //error_reporting(0);
     //@ini_set('display_errors', 0);

	 //echo "<br> START Cookie"; 
	//get chechBox for save/save not Cookies!!!!!!!!!!!!!!!!
	//if cookie length
	
	global $UUID_X; //must be global to get value from Classes/Buy_Ticket.php->function Buy_Ticket_Action()
	
    $newArray = array(
	            $_POST['serverVenue'],
                $_POST['serverEvent'], 
				$_POST['serverDate'], 
				$_POST['serverDateNormal'], 
				$_POST['serverStartTime'], 
				$_POST['serverTicketPlace'],  
				$_POST['serverName'], 
				$_POST['serverEmail'], 
			    $_POST['serverPrice'], 
				$UUID_X //gets UUID from Classes/Buy_Ticket.php->function Buy_Ticket_Action()
				);
				
	$getCookies_array = json_decode($_COOKIE['myTicketList'] /*, true*/);
	//$getCookies_array
	array_push($getCookies_array, $newArray);
	
	
	setcookie('myTicketList', json_encode($getCookies_array),  time() + $this->CookieTimeMonth, "/"  );  //(86400 * 30) // 86400 = 1 day
	
	//echo "<br> END Cookie"; 
	//$ra_serialized = serialize($getCookies_array);
    //setcookie('myTicketList', $ra_serialized, time()+ $this->CookieTimeMonth , '/');
    //$_COOKIE['myTicketList'] =
	
	//echo($_COOKIE['myTicketList']);
  }
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
   

   
   
   
   

  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
  public function get_all_cookies_list() 
  {
       //$getCookies_array = unserialize($_COOKIE['myTicketList']);
	   
	   //print_r($_COOKIE['myTicketList']);
	   //echo "<br><br>";
	   
	   /*
	   foreach ($_COOKIE['myTicketList'] as $key=>$val)
       {
           echo $key.' is '.$val."<br>\n";
       }
	   */
	
	   //echo json_encode(json_decode($_COOKIE['myTicketList']));
	   
	   //no need for {json_encode} as $_COOKIES are already stored in JSON format
	   echo $_COOKIE['myTicketList'];
  }
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
   



}

?>
