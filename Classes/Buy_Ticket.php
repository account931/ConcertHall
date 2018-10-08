<?php

class Buy_Ticket  {


   



    // 
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function Buy_Ticket_Action() {
		global $conn; // global from $singeltone=ConnectDB::getInstance();
		//UUD , ckeck if UUD exists, if place free
		
		 $UUID = md5(uniqid());  //md5 the unique number
		 echo json_encode('$UUID: ' . $UUID);
		
		/*
        try {        
            //-----------------
			// INNER JOIN  STATEMENT (in order to get info not only about Venue Seats Scheme(SQL Hall_Scheme_List_of_Venues), but also Event Name from (SQL Hall_Events)
            $stmt = $conn->prepare("SELECT * FROM   Hall_Scheme_List_of_Venues  INNER JOIN    Hall_Events    on Hall_Scheme_List_of_Venues.place_id=Hall_Events.ev_venueHall_id	WHERE Hall_Scheme_List_of_Venues.place_id ='{$_POST['serverHall_Id']}'"); 
            //$stmt = $conn->query("SELECT * FROM  Hall_Scheme_List_of_Venues WHERE place_id ='{$_POST['serverHall_Id']}'"); 
            $stmt->execute();
			$rowF = $stmt->fetchAll();
			echo json_encode($rowF);
            //-----------------
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
   
        $conn = null;
         */
   }


// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
// END StartBooking()






















}
// end Class

?>
