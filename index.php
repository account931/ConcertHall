<?php
//session_start();
include 'Classes/autoload.php';//uses autoload instead of manual includin each class->

date_default_timezone_set("Europe/Kiev"); //mega Fix to fix Error in UnixStamp Diffrenece on LocalHost and Server(local was Moscow, server zzz - Kyiv)

$testEventForeveryDay = new Auto_Add_Event_Every_Day(); 
$testEventForeveryDay->addTestEvent();        //Auto Adds INSERT events for every current day, just for test
//$testEventForeveryDay->autoDeleteOldEvents(); //Auto DELETE events older than today

//get to know timezone zet at Server
/*
$date = new DateTime();
$timeZone = $date->getTimezone();
echo $timeZone->getName();
*/
?>

<!doctype html>
<!--------------------------------Bootstrap  Main variant ------------------------------------------>
  <html lang="en-US">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="Content-Type" content="text/html">
      <meta name="description" content="myConcert" />
      <meta name="keywords" content="myConcert">
      <title>myConcert</title>
  

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <!-- Fa-fa library-->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	 
      <link rel="stylesheet" type="text/css" media="all" href="css/myConcert.css">
	  
      <script src="js/myConcert.js"></script>         <!-- Core myFacebook API JS-->
	  <script src="js/changeStyleTheme.js"></script>   <!-- Change wallpapers,changeStyleTheme JS-->
	  
	  
	 
	  
	
	  
	  <meta name="viewport" content="width=device-width" />
	  
	  <!--Favicon-->
      <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon">

     </head>

     <body>  
	 
	 



       <div id="headX" class="jumbotron text-center gradient alert-success my-background head-style" style =' background-color:lavender ;'> <!--#2ba6cb;-->
         <h1 id="h1Text"> <span id="textChange"> myConcert on-line</span> <i class="fa fa-weibo" style="font-size:48px;color:"></i><!--</span> <img src="http://78.media.tumblr.com/tumblr_m2hq5tt3ma1qav3uso1_400.gif" style="width:3%"/>--> </h1> 	   
	   </div>



       
         <div class="wrapper grey">
    	     <div class="container">
		         <div class="row row1">
			 
			     
					 
			  
			         <!-------------- FORM to GENERATE Hall seats------------->	
			         <!-- Each div should have id = checkboxID + "Div",  to automate it in js_controls.js -->
		             <div class="col-sm-4 col-xs-12 my-background coreDivs-toHide head-style" style="background-color:lavender;" id="qrGenerateDiv" >
		                 <!-------------- GENERATE Hall seats Start------------->	
                         <form action="" id="myFormZ" method="post">
						 
                             <div class="form-group">
                                  <label for="vertcRows">Number of V Rows: <span class="glyphicon glyphicon glyphicon-sort"></span></label>
                                  <input type="number" class="form-control" id="vertcRows" name="" required>
                             </div>
							 
							  <div class="form-group">
                                  <label for="seatsInRows">Number of  H Seats in Row: <span class="glyphicon glyphicon-transfer"></span></label>
								  <span class="error_req"> * </span> <span class="sp"  id =""> </span>
                                  <input type="text" class="form-control checkRegExp" id="seatsInRows" name="" required>
                             </div>
					
                            <button type="button" class="btn btn-default" id="createHall">Create</button>
				            <button type="button" class="btn btn-default" id="clear">Clear</button>
                        </form>				   
                        <!---------------- END Form to GENERATE  GENERATE Hall seats -------->				   
				  
			         </div> <!--END <div class="col-sm-4" style="background-color:lavender;">-->
				     <!--</div>--> <!--"row">-->			 	 
					 
					 
					  <div class="col-sm-1 col-xs-12 my-background ">
					  </div>
					 
					 
					 
					 
				     <!---------------- Div with DatePicker -------->	
				     <div class="col-sm-4 col-xs-12 my-background coreDivs-toHide head-style"  id="datePicker" >
					     <div class="form-group">
                              <label for="dateHistorical">Select date </label>
				              <input type="date" name="" id="dateHistorical" class="date"> 
							   <input id ="getDateEvent" type="button" class="btn btn-default" value="Get">
						  </div>
						 
					 </div>
				     <!---------------- Div with DatePicker -------->
					 
					 
				 
				   </div>  <!-- END class="row row1"> here, to make sure QR img appears on the same line in desktop-->
				 
				 
				 
				 
				 
				    <!--------- List of upcoming Events from {Hall_Events} SQL DB, with date which >= today -------->
				    <br>
				    <div class="col-sm-12 col-xs-12 head-style" >    
					    <h3> Upcoming Events<span id="eventsQuanity"></span></h3>
						<h4 id="upcomingEvents"></h4>
				    </div>
				    <!------ END List of upcoming Events from {Hall_Events} SQL DB -------->
				    
				 
				 
				    <!--------- Error Closable window-------->
					<br>
					<div class="col-sm-12 col-xs-12" id="errorDiv"> 
				       
					</div>
				    <!------ ENF Error Closable window-------->
					
					
					
					
					
					
				 
				    <!--------- Venue_Hall Info (Venue name, Event Name amount of seats)-------->
				    <br><hr style="height:3em, color:white;width:99%;">
				    <div class="col-sm-12 col-xs-12 head-style" id="hallInfo">    
				    </div>
				    <!------ End Venue_Hall Info (Venue name, Event Name amount of seats) -------->
				 
				 
				 
				 
				    <!---------------- HALL Seats Plan Scheme --------------->
				    <br>
				    <div class="col-sm-12 col-xs-12 head-style" id="status">    
				    </div>
				    <!--------------- END  HALL Seats Plan Scheme ------------------>
				 
				  
				  
				  
				  
				
				

				<!------    JUST TO FIX OVERLAPPING by footer ------->
				<div class="col-sm-12 col-xs-12 head-style" style="height:400px;">
				</div>
				
				
	 

	 
	 
    		</div><!-- /.container -->	  		
         </div><!-- /.wrapper -->
        
                


    	          
    	
		
		
		
			      <!-----------------  Button to change Style theme------------------------->
	              <input type="button" class="btn" value=">>" id="changeStyle" style="position:absolute;top:0px;left:0px;" title="click to change theme"/>
	              <!-----------------  Button to change Style theme------------------------->
				  
				  
				  
				  
				  <!-----------------  Modal window with info------------------------------>
      <div id="myModalZ" class="modal fade" role="dialog">
          <div class="modal-dialog">
          <!-- Modal content-->
              <div class="modal-content">
                  <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal">&times;</button>
                       <h4 class="modal-title">Buy a ticket </h4>
                  </div>
                  <div class="modal-body">
				      <center>
				      <img src="images/buy.jpg" alt="img"/><br> 
                      <p>
					     	<label for="formUserName">Your Name:</label>
                            <input type="text" class="form-control inputZ" id="formUserName" required/>
							<br>
							<label for="formUserEmail">Your E-mail:</label>
                            <input type="text" class="form-control inputZ" id="formUserEmail" required/>
							<br>
							<label for="formTicketDate">Ticket Date:</label>
                            <p class="form-control inputZ" id="formTicketDate"></p>
							<br>
							<label for="formTicketTime">Time:</label>
                            <p class="form-control inputZ" id="formTicketTime"></p>
							<br>
							<label for="formEvent">Event:</label>
                            <p class="form-control inputZ" id="formEvent"></p>
							<br>
							<label for="formVenue">Venue:</label>
                            <p class="form-control inputZ" id="formVenue"></p>
							<br>
		                    <label for="formTicketPlace">Ticket Place:</label>
                            <p class="form-control inputZ" id="formTicketPlace"></p>
							<br>
		                    <label for="formTicketID">Ticket ID (just for test, will be generated in PHP):</label>
                            <p class="form-control inputZ" id="formTicketID"> </p>
							<br>
		                    <label for="formTicketID">Price:</label>
                            <p class="form-control inputZ" id="formTicketPrice" value=""> </p>
							<br>
					  </p>
					  </center>
                  </div>
                  <div class="modal-footer">
				       <button type="button" class="btn btn-default" id="agreedAddToSQL">Buy</button>
                       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
              </div>

         </div>
     </div>
      <!-----------------  END Modal window with info---------------------------->
				  
				  
				  
				  
				  
				  
				  
				  
		
		          <!------------- Footer ------------->
				  <div class="footer navbar-fixed-bottom"> <!--navbar-fixed-bottom  fixxes bootom problem-->
				      Contact: <strong>dimmm931@gmail.com</strong><br>
					  <?php  echo date("Y"); ?>
				  </div>
		          <!------------ END Footer ----------->  
		
		
		
		
		<!-- ##### -- Advertise -- #### -->
		<!--
		   <div class="ads ">
		        <a target="_blank" href="https://www.facebook.com/events/165143454205556/" id="link">
				    <img src="images/ads/sub_od.jpg" alt="Submerged"/>  
				</a>	
			</div>
			-->
		<!-- ##### -- END Advertise -- #### -->
		
		
		
		
    
    </body>
</html>





<?php

// Record (with CLASS) all the  input  to  txt;  //;
      include("Classes/RecordTxt.php");
      RecordTxt::RecordAnyInput(array(/*$user*/), 'recordText/myConcert.txt');// Record  to  text;
//End  Record;
?>
