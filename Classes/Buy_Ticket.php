<?php


class Buy_Ticket  {
	
	
   private $UUID;
   //global $ticketPdfInfo;
   
   function __construct() {
       $this->UUID = $UUID;
   }
   
   //getter
   function getData() 
   {
       return $this->UUID;
   }
   

    // 
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function Buy_Ticket_Action() {
		global $conn; // global from $singeltone=ConnectDB::getInstance();
		global $ticketPdfInfo;  // set as global(array with user Ticket data)
		//global $UUID_X; //must be global to use in Classes/MyCookies.php->function add_to_cookies()
		
 
		 //generates UUID - unique ticket number
		 $UUID = md5(uniqid());  //md5 the unique number
		 //echo json_encode('$UUID: ' . $UUID);
		 $this->UUID = $UUID ;
		 //$UUID_X = $UUID ;  //assign UUID to global var to be used in Classes/MyCookies.php->function add_to_cookies() 
		
        try {        
			//checking if UUID is not in DB yet
            $stmt = $conn->query("SELECT * FROM  Hall_Free_taken_seats  WHERE fts_uuid ='{$UUID}'"); 
			if($stmt->rowCount()== 0) { //no record found
			    //echo json_encode($UUID . "UUID is not taken");
				
				    try {  
                        //checking if seat is not taken					
                        $stmt2 = $conn->query("SELECT * FROM  Hall_Free_taken_seats  WHERE  (fts_venue_id = '{$_POST['serverVenue']}') AND (fts_event_name = '{$_POST['serverEvent']}') AND (fts_unix_date = '{$_POST['serverDate']}') AND (fts_booked_place = '{$_POST['serverTicketPlace']}') "); 
			
			            if($stmt2->rowCount()== 0) {
							/*if(*/$this->insert_Ticket(); /*){*/  //if method return TRUE
								//Adds a booked ticket to php Cookies(instead of using ajax_php/Cookie_Busket_Add.php)
                                //$cookie = new MyCookie();
	                            //$cookie ->add_to_cookies(); 
								
								//echo json_encode($ticketPdfInfo); //!!!is reassigned from {insert_Ticket()}, to be used only after {$cookie = new MyCookie();$cookie ->add_to_cookies();},
         		                                                 //!!!because u've to set cookies first and then make echo. Otherwise-> u'll get error :CAN"T MODIFY HEADERS, HEADERS ALREADY SENT 
							//} 
							//$this->send_PDF_Mail_to_Client();
						} else {
							$this->notify_Place_Is_Taken();
						}
					} catch (PDOException $e) {
							 echo $e->getMessage();
						}
					 } else {
						 $this->regenerateUUID();
					 }
				
			

        } catch(PDOException $e) {
            echo $e->getMessage();
        }
   
        $conn = null;
         
   }


// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
// 











    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function insert_Ticket() 
	{
           global $conn; // global from $singeltone=ConnectDB::getInstance();
		   global $ticketPdfInfo;  // set as global(array with user Ticket data)
		   
		    $status = "FAIL"; //by default is FAIl, if INSERT is Ok it will change to "OK"
			$status2 = false;
		  
		   //Start INSERT (from  ---------
           $sth = $conn ->prepare("INSERT INTO Hall_Free_taken_seats(fts_venue_id, fts_event_name, fts_unix_date, fts_dateNormal, fts_start_time, fts_booked_place, fts_booker_name, fts_booker_email, fts_place_price, fts_uuid ) VALUES (:venue, :event, :unixTime, :dateNormal, :startTime, :seatPlace, :bookerName, :bookerEmail, :price, :uuid) ");
				  
           $sth->bindValue(':venue', $_POST['serverVenue'] );   //the id of ConcertHall in table Hall_List_of_Venues
           $sth->bindValue(':event', $_POST['serverEvent']);             //name of event 'LTJ Bukhem'
           $sth->bindValue(':unixTime',   $_POST['serverDate']);            // TAble Number ID
           $sth->bindValue(':dateNormal', $_POST['serverDateNormal']);        //unix timestamp   
           $sth->bindValue(':startTime',  $_POST['serverStartTime'] );
		   $sth->bindValue(':seatPlace',  $_POST['serverTicketPlace'] );
		   $sth->bindValue(':bookerName', $_POST['serverName'] );
		   $sth->bindValue(':bookerEmail',$_POST['serverEmail'] );
		   $sth->bindValue(':price',      $_POST['serverPrice'] );
		   $sth->bindValue(':uuid',       $this->UUID );
           $sth->execute();
		   
		   $status = "OK";
		   $status2 = true;
		   
		   //array with all Ticket info to pass back to ajax {run_ajax_to_Buy_Ticket()} to dispaly ready PDF ticket onSuccess in {display_PDF_Ticket(data);}
		  $ticketPdfInfo = array( "VenueName"=> $_POST['serverVenue'],
                 		           "EventName"=> $_POST['serverEvent'], $_POST['serverDate'], 
								   "DateNorm"=>  $_POST['serverDateNormal'], 
								   "TimeStartt"=> $_POST['serverStartTime'], 
								   "TicketPlace"=> $_POST['serverTicketPlace'],  
								   "UserName"=>  $_POST['serverName'], 
								   "UserMail"=>  $_POST['serverEmail'], 
								   "Price"=> $_POST['serverPrice'], 
								   "UUID"=> $this->UUID, 
								   "Status" => $status );  //status for SQL INSERT(if was successfull)
									  
		   
		   //print_r($ticketPdfInfo);
		   echo json_encode($ticketPdfInfo);  //!!!reassigned to be used in this same file, but only after {$cookie = new MyCookie();$cookie ->add_to_cookies();},
         		                                //!!!because u've to set cookies first and then make echo. Otherwise-> u'll get error :CAN"T MODIFY HEADERS, HEADERS ALREADY SENT 
		   
           //END INSERT (from function ---------
		   
		   return $status2;

	}
   // **                                                                                  **
   // **************************************************************************************
   // **************************************************************************************


   
   
   
   
   
   
   
   
   
   
    //if  UUID is already in DB, generates a new one
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function regenerateUUID() 
	{
         echo "UUID is already taken!!!!";   //make cause crash in ajax, change to JSON  
         $this->Buy_Ticket_Action();  //reload the action //NOT TESTED
	}
   // **                                                                                  **
   // **************************************************************************************
   // **************************************************************************************
   
   
    
	
	//If the seat was taken while the user was thinking
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function notify_Place_Is_Taken() 
	{
        echo "Seat has been booked while you were thinking!!!!";   

	}
   // **                                                                                  **
   // **************************************************************************************
   // **************************************************************************************



}
// end Class

?>
