<?php
//include '../Classes/autoload.php';   //uses autoload instead of manual includin each class->


//Every new day adds a test new evevt for this day, if it has not been created

class Auto_Add_Event_Every_Day  {


   

    // Start 
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **  
    public function addTestEvent() {
		global $conn; // global from $singeltone=ConnectDB::getInstance();
		$singeltone=ConnectDB::getInstance(); //creates connection $con;  //was deactivated in index.php
		
		//gets today UnixStamp
		//date_default_timezone_set("Europe/Kiev");
		$date = strtotime("+1 day");
		$UnixSt = strtotime(date('d-m-Y',$date ));   //echo date('m-d-y',$date)
		
		try{
			//checks if an event for today has not been created yet
			$resFR = $conn->query("SELECT * FROM Hall_Events WHERE ev_date ='{$UnixSt}'"); 
            if($resFR->rowCount()==0) {
			
                //Start INSERT (from function StartBooking())---------
                $sth = $conn ->prepare("INSERT INTO Hall_Events(ev_name, ev_venueHall_id, ev_price, ev_date ) VALUES (:event, :hall, :price, :date) ");
                $sth->bindValue(':event', 'LTJ Bukhem');   //name of event
                $sth->bindValue(':hall' ,  1);             // the id of ConcertHall in table Hall_List_of_Venues
                $sth->bindValue(':price',  15);            // TAble Number ID
                $sth->bindValue(':date' , $UnixSt);        //unix timestamp
            
                $sth->execute();
                //END INSERT (from function StartBooking())---------
            } //else {echo "exists";}

		} catch(PDOException $e) {
            echo "ERR-ed";
            echo "Error: " . $e->getMessage();
        }
    $conn = null;

   }


// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
// END StartBooking()






















}
// end Class

?>
