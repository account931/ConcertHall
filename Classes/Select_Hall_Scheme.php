<?php

class Select_Hall_Scheme  {


   



    // Start 
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function Select_Seats_Values() {
		global $conn; // global from $singeltone=ConnectDB::getInstance();
		//$singeltone=ConnectDB::getInstance(); //creates connection $con;  //was deactivated in index.php
        //$hall_ID=$_POST['serverHall_Id'];  // Hall ID
        try {        
            //-----------------
            $stmt = $conn->query("SELECT * FROM  Hall_Scheme_List_of_Venues WHERE place_id ='{$_POST['serverHall_Id']}'"); 
            //$stmt->execute();
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
