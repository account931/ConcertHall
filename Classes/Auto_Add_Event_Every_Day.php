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
		//$date = strtotime("+1 day");  //time ERROR fixed with setting in index.php {date_default_timezone_set("Europe/Kiev")} //mega Error in UnixStamp Diffrenece on LocalHost and Server was due (local was Moscow, server zzz - Kyiv)
		$UnixSt = strtotime(date('d-m-Y'/*,$date */));  //gets current day  //echo date('m-d-y',$date)
		
		$artistsArray = array('LTJ Bukhem', 'Ed Rush & Optical', 'BSE', 'Noisia', 'Concord Dawn', 
		    'TeeBee', 'Calyx', 'Raiden', 'Technical Intch', 'Spor', 'Corrupt Souls', 'Klute', 'Spectrasoul', 
			'Submerged', 'Pendulum', 'High Contrast', 'Chase & Status', 'Kosheen', 'Black Sun Empire', 'Sub Focus', 
			'Roni Size', 'Photek', 'Future Prophecies', 'Evol Intent', 'Enduser', 'Nu:Tone', 'Dieselboy', 
			'Camo & Krooked', 'LimeWax', 'Omni Trio', 'State Of Mind', 'Dom & Roland', 'Phace', 'The Upbeats', 
			'Bad Company UK', 'Kryptic Minds & Leon Switch', 'D.Kay', 'Chris.SU', 'Mefus',
			'Logistics', 'Photek', 'Technical Itch', 'Mayhem', 'N.Phect', 'Bulletproof');
			
		//gets 3 random artist to auto INSERT
		$randomArtists = array();
		for ($i = 0; $i < 3; $i++ ){
			$randomX = $artistsArray[rand(0, count($artistsArray) - 1)];
			array_push($randomArtists, $randomX);  
		}
		//print_r($randomArtists); uncomment to see in index.php first line
		
		try{
			//checks if an event for today has not been created yet
			$resFR = $conn->query("SELECT * FROM Hall_Events WHERE ev_date ='{$UnixSt}'"); 
            if($resFR->rowCount()==0) {
			
                //Start INSERT (from  ---------
                $sth = $conn ->prepare("INSERT INTO Hall_Events(ev_name, ev_venueHall_id, ev_price, ev_date, ev_start_time ) VALUES (:event, :hall, :price, :date, :startTime) ");
                $sth->bindValue(':event', $randomArtists[0] );   //name of event 'LTJ Bukhem'
                $sth->bindValue(':hall' ,  1);             // the id of ConcertHall in table Hall_List_of_Venues
                $sth->bindValue(':price',  15);            // TAble Number ID
                $sth->bindValue(':date' , $UnixSt);        //unix timestamp 
                $sth->bindValue(':startTime', '19.30' );
                $sth->execute();
                //END INSERT (from function ---------
				
				//Start INSERT (from function StartBooking())---------
                $sth2 = $conn ->prepare("INSERT INTO Hall_Events(ev_name, ev_venueHall_id, ev_price, ev_date,  ev_start_time ) VALUES (:event, :hall, :price, :date, :startTime) ");
                $sth2->bindValue(':event', $randomArtists[1] );   //name of event 'Ed Rush & Optical'
                $sth2->bindValue(':hall' ,  2);             // the id of ConcertHall in table Hall_List_of_Venues
                $sth2->bindValue(':price',  23);            // TAble Number ID
                $sth2->bindValue(':date' , $UnixSt);        //unix timestamp
                $sth2->bindValue(':startTime' , '22.00');
                $sth2->execute();
				
				
				//Start INSERT (from function StartBooking())---------
                $sth3 = $conn ->prepare("INSERT INTO Hall_Events(ev_name, ev_venueHall_id, ev_price, ev_date,  ev_start_time ) VALUES (:event, :hall, :price, :date, :startTime) ");
                $sth3->bindValue(':event', $randomArtists[2] );   //name of event 'BSE'
                $sth3->bindValue(':hall' ,  3);             // the id of ConcertHall in table Hall_List_of_Venues
                $sth3->bindValue(':price',  44);            // TAble Number ID
                $sth3->bindValue(':date' , $UnixSt);        //unix timestamp
                $sth3->bindValue(':startTime' , '21.00');
                $sth3->execute();
				
				
            } //else {echo "exists";}

		} catch(PDOException $e) {
            echo "ERR-ed";
            echo "Error: " . $e->getMessage();
        }
		//END adds new EVENT for today
		
		
		
		
		/*
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
		*/
		
    $conn = null;

   }


// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
// END StartBooking()






// Autodelete old events
// **************************************************************************************
// **************************************************************************************
//                                                                                     **  
    public function autoDeleteOldEvents() 
	{
		
		global $conn; // global from $singeltone=ConnectDB::getInstance();
		$singeltone=ConnectDB::getInstance(); //creates connection $con;  //was deactivated in index.php
		
		$UnixToday = strtotime(date('d-m-Y'/*,$date */));  //gets current day
		
		try {	
		    //$sql = "DELETE FROM Hall_Events WHERE ev_date < :currDate";      
            //$stmt = $conn->prepare($sql);
			$stmt = $conn->prepare("DELETE FROM Hall_Events WHERE ev_date < :currDate");
            $stmt->bindParam(':currDate', $UnixToday/*, PDO::PARAM_INT*/);   
            $stmt->execute();
        }
        catch(PDOException $e)
        {
             echo $sql . "<br>" . $e->getMessage();
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
