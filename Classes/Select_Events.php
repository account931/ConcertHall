<?php

class Select_Events  {



    // Start SELECT ALL Venues whick date is greater than today
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function select_Events_Values($unix) {  //$unix == today Unixstamp
		global $conn; // global from $singeltone=ConnectDB::getInstance();
		//$singeltone=ConnectDB::getInstance(); //creates connection $con;  //was deactivated in index.php
        //$hall_ID=$_POST['serverHall_Id'];  // Hall ID
        try {        
            //-----------------
			// INNER JOIN  STATEMENT
            $stmt = $conn->prepare("SELECT ev_name, ev_date, ev_price, ev_start_time, place_name, place_id, place_address FROM  Hall_Events  INNER JOIN    Hall_Scheme_List_of_Venues    on Hall_Events.ev_venueHall_id=Hall_Scheme_List_of_Venues.place_id	WHERE Hall_Events.ev_date >='{$unix}' "); 
                                  
            //$stmt = $conn->query("SELECT * FROM  Hall_Events WHERE ev_date >='{$unix}'"); //without Inner join
			
			$stmt->execute();
			$result = $stmt->fetchAll();
			echo json_encode($result);
			
            //-----------------
        } catch(PDOException $e) {
            echo $e->getMessage();
        }
   
        $conn = null;
        //echo "gfgfgfgf"; 
   }


// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
// END 

























}
// end Class

?>
