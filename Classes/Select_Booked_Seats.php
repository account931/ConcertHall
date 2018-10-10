<?php

class Select_Booked_Seats  {


   



    // )
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function Select_Taken_Seats() {
		global $conn; // global from $singeltone=ConnectDB::getInstance();
	
        try {        
          
            $stmt = $conn->prepare("SELECT * FROM   Hall_Free_taken_seats /* INNER JOIN    Hall_Events    on Hall_Scheme_List_of_Venues.place_id=Hall_Events.ev_venueHall_id */  WHERE fts_unix_date ='{$_POST['serverDate']}' AND fts_event_name ='{$_POST['serverEvent']}'  AND fts_venue_id ='{$_POST['serverVenue']}' "); 
            //$stmt = $conn->query("SELECT * FROM  Hall_Scheme_List_of_Venues WHERE place_id ='{$_POST['serverHall_Id']}'"); 
            $stmt->execute();
			$rowF = $stmt->fetchAll();
			echo json_encode($rowF);
            //-----------------
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
   
        $conn = null;
   
   }


// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
// 






















}
// end Class

?>
