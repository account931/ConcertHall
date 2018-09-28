<?php
session_start();
//error_reporting(-1);
header('Content-Type: text/html; charset=utf-8'); //sets for russian letters
		
class StartPersonalSession {



    //Starts personal php session based on facebook successfull login
    // **************************************************************************************
    // **************************************************************************************
    // **                                                                                  **
    // **                                                                                  **

    public function StartSession(){
		
		
	    //echo "id-> " . $_POST['api_FB_id'];   //user id
		//echo "<br>name-> " . $_POST['api_FB_name']; //user name
    
	    if( isset($_POST['api_FB_id']) & $_POST['api_FB_id']!=''){
			//echo "<br> Logged OK";
			
			//starting session
			$_SESSION['connected'] = true;
			$_SESSION['userX'] = $_POST['api_FB_id'];
			
			//here your further code implementation
			//like, checking in personal DB if $_SESSION['userX'] id exists, if not INSERT. If exists, UPDATE last visit
			
			
		} else {
			//echo "<br> Logged Failed";
			$_SESSION['connected'] = false;
		}
		
		//JSOn output all SESSION vars, just for info purpose
		echo json_encode($_SESSION);
		
		//heading back to main FB page
		//header("Location: ../");  // if eader("Location: ../") crashes make sure there are no echoes above
		//die();
    }


    // **                                                                                  **
    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************







} // end  Class



//runs the Class method to start php Session
$start = new StartPersonalSession();
$start->StartSession();



















?>
