<?php

class Select_Events  {



    // Start 
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function select_Events_Values($unix) {
		global $conn; // global from $singeltone=ConnectDB::getInstance();
		//$singeltone=ConnectDB::getInstance(); //creates connection $con;  //was deactivated in index.php
        //$hall_ID=$_POST['serverHall_Id'];  // Hall ID
        try {        
            //-----------------
            $stmt = $conn->query("SELECT * FROM  Hall_Events WHERE ev_date ='{$unix}'"); 
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
