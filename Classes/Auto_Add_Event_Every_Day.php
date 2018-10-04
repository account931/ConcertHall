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
		
		//adds new EVENT for today
		//gets today UnixStamp
		$date = strtotime("+1 day");
		$UnixSt = strtotime(date('d-m-Y',$date ));   //echo date('m-d-y',$date)
		
		try{
			//checks if an event for today has not been created yet
			$resFR = $conn->query("SELECT * FROM Hall_Events WHERE ev_date ='{$UnixSt}'"); 
            if($resFR->rowCount()==0) {
			
                //Start INSERT (from function StartBooking())---------
                $sth = $conn ->prepare("INSERT INTO Hall_Events(ev_name, ev_venueHall_id, ev_price, ev_date, ev_start_time ) VALUES (:event, :hall, :price, :date, :startTime) ");
                $sth->bindValue(':event', 'LTJ Bukhem');   //name of event
                $sth->bindValue(':hall' ,  1);             // the id of ConcertHall in table Hall_List_of_Venues
                $sth->bindValue(':price',  15);            // TAble Number ID
                $sth->bindValue(':date' , $UnixSt);        //unix timestamp 
                $sth->bindValue(':startTime', '19.30' );
                $sth->execute();
                //END INSERT (from function StartBooking())---------
            } //else {echo "exists";}

		} catch(PDOException $e) {
            echo "ERR-ed";
            echo "Error: " . $e->getMessage();
        }
		//END adds new EVENT for today
		
		
		
		
		
		//adds a new EVENT for aftertomorrow (+2 days)
		$dateTomorrow = strtotime("+3 day");
		$UnixStTomorrow = strtotime(date('d-m-Y',$dateTomorrow ));   //gets unixstamp for aftertomorrow//echo date('m-d-y',$date)
		
		try{
			//checks if an event for today has not been created yet
			$resFR = $conn->query("SELECT * FROM Hall_Events WHERE ev_date ='{$UnixStTomorrow}'"); 
            if($resFR->rowCount()==0) {
			
                //Start INSERT (from function StartBooking())---------
                $sth = $conn ->prepare("INSERT INTO Hall_Events(ev_name, ev_venueHall_id, ev_price, ev_date,  ev_start_time ) VALUES (:event, :hall, :price, :date, :startTime) ");
                $sth->bindValue(':event', 'Ed Rush & Optical');   //name of event
                $sth->bindValue(':hall' ,  2);             // the id of ConcertHall in table Hall_List_of_Venues
                $sth->bindValue(':price',  23);            // TAble Number ID
                $sth->bindValue(':date' , $UnixStTomorrow);        //unix timestamp
                $sth->bindValue(':startTime' , '22.00');
                $sth->execute();
                //END INSERT (from function StartBooking())---------
            } //else {echo "exists";}

		} catch(PDOException $e) {
            echo "ERR-ed";
            echo "Error: " . $e->getMessage();
        }
		
		//END adds a new EVENT for aftertomorrow
		
		
		
		//adds a new EVENT for AFTER-aftertomorrow (+4 days)
		$dateTomorrow3 = strtotime("+5 day");
		$UnixStTomorrow3 = strtotime(date('d-m-Y',$dateTomorrow3 ));   //gets unixstamp for aftertomorrow//echo date('m-d-y',$date)
		
		try{
			//checks if an event for today has not been created yet
			$resFR = $conn->query("SELECT * FROM Hall_Events WHERE ev_date ='{$UnixStTomorrow3}'"); 
            if($resFR->rowCount()==0) {
			
                //Start INSERT (from function StartBooking())---------
                $sth = $conn ->prepare("INSERT INTO Hall_Events(ev_name, ev_venueHall_id, ev_price, ev_date,  ev_start_time ) VALUES (:event, :hall, :price, :date, :startTime) ");
                $sth->bindValue(':event', 'BSE');   //name of event
                $sth->bindValue(':hall' ,  3);             // the id of ConcertHall in table Hall_List_of_Venues
                $sth->bindValue(':price',  44);            // TAble Number ID
                $sth->bindValue(':date' , $UnixStTomorrow3);        //unix timestamp
                $sth->bindValue(':startTime' , '21.00');
                $sth->execute();
                //END INSERT (from function StartBooking())---------
            } //else {echo "exists";}

		} catch(PDOException $e) {
            echo "ERR-ed";
            echo "Error: " . $e->getMessage();
        }
		
		//END adds a new EVENT for AFTER-aftertomorrow (+4 days)
		
    $conn = null;

   }


// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
// END StartBooking()






















}
// end Class

?>
