<?php

class Select_Hall_Scheme  {


   



    // Request to SQL Hall_Scheme_List_of_Venues to get seats SCHEME(2,[4,4,n,n])
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function Select_Seats_Values() {
		global $conn; // global from $singeltone=ConnectDB::getInstance();
		//$singeltone=ConnectDB::getInstance(); //creates connection $con;  //was deactivated in index.php
        //$hall_ID=$_POST['serverHall_Id'];  // Hall ID
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
        //echo "gfgfgfgf"; 
   }


// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
// END StartBooking()






















}
// end Class

?>