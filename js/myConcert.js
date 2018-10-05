$(document).ready(function(){
	var x;  //vertical rows in hall
	var z  = [];  //array with horizontal seats in hall, it is array with specific number of Hoz seats for every Vert row. You may add just one digit to this array, the rest will be autocompleted
	var event;  //Event name from get_ajax_Events_List_From_SQL()
	var priceX; //price from get_ajax_Events_List_From_SQL()
	var venueZ, dateTicket, startTimeZ, seatID;
	var seatsTakenArray = ["1_2", "1_4", "4_3"]; //taken seats, emulates SQL result for taken seats
	
	//sets today to datepicker form value
	document.getElementById('dateHistorical').valueAsDate = new Date();
	
	
	
	//onLoad run ajax function to get any Event avilable for today( from {Hall_Events} SQL DB)
	get_ajax_Events_List_From_SQL();
	
	//gets Seats taken!!!!
	
    //onLoad run ajax function to get Halls name, address, rows and column seats from SQL DB,-> 
    //includes 3 function inside (checkSeatsInRowsValueInput(x, z) + buildHallSeats(x, z, getHeight) + calc_AllSeatsAmount_and_show_EventHeaderInfo(x,z,data)}		
	//get_ajax_VenueHall_Seats_Scheme_From_SQL(); //TEMPORARY
	
	
	
	//OnClick on the event in the Upcoming Event List-> to show/draw relevant Venue Hall
	// **************************************************************************************
    // **************************************************************************************
    // **                                                                                  **
	$(document).on("click", '.event', function() {   // this click is used to react to newly generated events;
	    showRelevantVenueHall_withRelevantEvent(this.id);
	});
	
	
	
	
	
	// On button Click creates Hall Seats Scheme according to your values(custom form)
	// **************************************************************************************
    // **************************************************************************************
    // **                                                                                  **
    // **                                                                                  **

	$("#createHall").click(function() { 
         z  = []; //clear/empty the array, if there are any prev values
		 event = "Empty Event";
	    
		//checks if not empty user's input
	    if( $("#vertcRows").val()=="" ||  $("#seatsInRows").val()=='' ){
		    alert("Can not be empty");
			return false;
		}	
		
		//checks correct input to field2(#seatsInRows). If may enter 1 digit(for all Vert) or several digits separated by comma for every Vert Row
		checkSeatsInRowsValueInput($("#vertcRows").val(), $("#seatsInRows").val());
	   
		//build your Hall onClick
	    buildHallSeats(x, z, getHeight);  //as z can be array ONLY
		
		calc_AllSeatsAmount_and_show_EventHeaderInfo(x,z,null);  //args(input1_Vert, input2Array_Horiz, ajax_data)
		
		scrollResults("#hallInfo");
    });
	
	
	
	
	
	// Click on any seat to show modal with option to buy a ticket--------------
	// **************************************************************************************
    // **************************************************************************************
    // **                                                                                  **
    // **                                                                                  **

	 $(document).on("click", '.round', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	     if(seatsTakenArray.indexOf(this.id) >= 0 ){ //if seatId is in array of taken places, receieved from SQL SELECT
	         alert(this.id + " is already booked");
		 } else {
			 //if(confirm ("Buy ticket " + this.id + " ?")){
				 $("#myModalZ").modal("show"); //show ticket order form
				  
				 seatID = this.id; //to pass to modal window
				 $('#formTicketDate').html(dateTicket ); //sets date from get_ajax_Events_List_From_SQL() 
				 $('#formTicketTime').html(startTimeZ);
				 $('#formEvent').html(event); //sets Event name from get_ajax_Events_List_From_SQL()  
				 $('#formVenue').html(venueZ); //sets price from get_ajax_Events_List_From_SQL()
				 $('#formTicketPlace').html("Row: " + this.id.split('_')[0] + " Seat:" + this.id.split('_')[1] + " (" + this.id + ")"); //sets the seat place, gets if from this.id (1_2)
				 $('#formTicketID').html(generateUUID()); //sets ticket id from function generateUUID()
				 $('#formTicketPrice').html( priceX + " USD" ); //sets price from get_ajax_Events_List_From_SQL() 
				  
				 
			 //alert(this.id );
			 //send ajax to SQL to book
			 //}
		 }
	 });
	
	
	
	
	// Fires onClick button "Buy" in modal window
	// **************************************************************************************
    // **************************************************************************************
    // **                                                                                  **
	 $(document).on("click", '#agreedAddToSQL', function() {   // this  click  is  used  to   react  to  newly generated cicles;
         if($('#formUserName').val()==''){
			 alert("Fields can not be empty");
			 return false;
		 } else {
			 alert("Running Ajax INSERT-> place(id), date, venue, name. " + seatID);
			 $("#myModalZ").modal("hide");
		 }
	 });
	
	
	
	
	
	
	
	
	// **************************************************************************************
    // **************************************************************************************
    // **                                                                                  **
    // **                                                                                  **

	function buildHallSeats(vertRows, arrayHorizont, callbackZ)
	{
		var coeficient;
		var styleTakenFree;
		
		//get arrayHorizont max element for automatic CSS width
		var max = Math.max.apply(null, arrayHorizont); 
		//alert("Max Horiz seats value " + max);
		$("#err").append("<br>Max Horiz seats value " + max); //instead of alert
		
		//Formula
		if(max > 0 && max < 20){
			coeficient = 0.7;
		} else if( max > 20 && max < 50 ){ alert("20-50");
			coeficient = 1.4;
		} else if( max > 50 && max < 100 ){ alert("50-100");
			coeficient = 0.99;
		}
		
		var widthX = (100 - (max * coeficient)) / (max + 5);
		
		
		var final = "";
		for(i= 0; i < vertRows; i++){
			final = final + "<div class='row containX'>";  //<div class='col-sm-12 col-xs-12'>";
			
			for(j= 0; j < arrayHorizont[i]; j++){
				
				var seatID = (i + 1) + "_" + (j + 1);  //to form seat numbers like 1_2, 2_1  not 0_1, 2_0

				
				if(seatsTakenArray.indexOf(seatID) >= 0 ){ //if seatId is in array of taken places, receieved from SQL SELECT
					styleTakenFree = 'taken'; 
			    } else {
					styleTakenFree = 'free'; 
				}
			
				final = final + "<div class='round " + styleTakenFree + "' style='width:" + widthX + "%' id=" + seatID + "><p>" + seatID + "</p></div>";
			}
			final = final + "</div>";
		}
		
		
		 $("#status").stop().fadeOut("slow",function(){ $(this).html(final)}).fadeIn(1000);
		 
		 
		 
		 //
		 /*
		  $('.containX').each(function(){  
          var highestBox = 0;

        $(this).find('.round').each(function(){
            if($(this).height() > highestBox){  
                highestBox = $(this).height();  
            } //alert('highestBox ' + highestBox);
        })

        $(this).find('.round').height(highestBox);
		$('.round').height(highestBox);
    }); 
	*/
	//
	
//function equalHeight(group) {
   tallest = 0;
   $(".round").each(function() {
      thisHeight = $(this).height();
      if(thisHeight > tallest) {
         tallest = thisHeight;
      }
	  //alert("tallestLoop=> " + tallest);
   });
   $(".round").height(tallest);
//}

   //alert("tallest " + tallest);
   $("#err").append("<br>tallest " + tallest); //instead of alert
   //equalHeight($(".round"));

	
	var vNavimg = document.getElementsByClassName("round");

    for(var i=0;i<vNavimg.length;i++){
       vNavimg[i].style.height = 84 +"px";
    }
	//
	
	
	callbackZ();
	
		
	}
	// **                                                                                  **
    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	//bulid onLoad-> reassigned to ajax SQL
	// buildHallSeats(3, [1, 2,], getHeight); //1st arg=>VerticalRows, 2nd arg=>array with seats in every Horizont Row
	 
	 
	 
	 
	 
	 
	 
	//checks correct input to field2(#seatsInRows). You may enter 1 digit(for all Vert) or several digits separated by comma for every Vert Row. If enetered more or less, it AUTOFIXES THE ARRAY
	// **************************************************************************************
    // **************************************************************************************
    // **                                                                                  **
    // **                                                                                  **

	 function checkSeatsInRowsValueInput(input1, input2)  //input1 = Number of V Rows(always 1 digit), input2 = Number of H Seats in Row(must be array)
	 {
		 
	      x = input1;
		  var y = input2; //users input, value for seats Hor
		
		
		  var patt = /\,/g; //RegExp for comma
		  //var horizonInput = $("#seatsInRows").val();
		  //alert(horizonInput);
		  
		 //if comma is detected in 2nd input, i.e custom user values for H seats
		 if( patt.test(input2)){
			 //alert("Comma detected");
			 //Below is uded instead of alert
			 var errorText = '<div class="alert alert-info alert-dismissible" id="err">' +
					         '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                             '<strong>Atention!</strong> Comma detected' +
                             '</div>';
			 $("#errorDiv").html(errorText);						
			 
			 //if user printed more or less values that requirs input1(input1.vertcRows = 3, input2.seatsInRows=3,2)
			 if(input2.split(",").length!= input1){
				 
				 //IF Users printed less values than required, (input1.vertcRows = 3, input2.seatsInRows = 3, 2)
				 if( input2.split(",").length < input1){
				     //alert("Seats don't not match [Less]");
					 $("#err").append("<br>Seats don't not match [Less]"); //instead of alert
				     var difference = input1 - input2.split(",").length; //alert("difference " + difference);
				     z = input2.split(",");
				     for(i = 0; i < difference; i++){
					     z.push(z[z.length - 1]);	 //just adds to array Z last Z array element
				     }
					 //alert(z);
					 $("#err").append("<br>" + z); //instead of alert
				 }
				
				 
				 //IF Users printed more values than required, (input1.vertcRows = 3, input2.seatsInRows = 3, 2, 7, 8). Just take the first necessary inputs
				 if ( input2.split(",").length > input1 ) {
					 //alert("Seats don't not match [More]");
					 $("#err").append("<br>Seats don't not match [More]"); //instead of alert
					 var b = input2.split(",");
					 for(i = 0; i < x; i++){
			             z.push(b[i]);
		             } 
					 //alert(z);
					 $("#err").append("<br>" + z); //instead of alert
					 
				 }
			 
             // If user printed equil amount			 
			 } else {
				 //alert("Seats match");
				 $("#err").append("<br>Seats match"); //instead of alert
				 z = input2.split(",");
			 }
			 
		 } else {
			 //IF user enetered just 1 digit, autocomplete the array with this digit
			 //creates array(as 2nd arg can be array ONLY, fill it with value, to make sure z.lengh === x)
		     //var z =[];
			 //alert("Just 1 digit");
			 $("#err").append("<br>Just 1 digit"); //instead of alert
		     for(i = 0; i < x; i++){
			     z.push(y);
		     }
		 }
		 
		 
	 }
	// **                                                                                  **
    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//RegExp for Front-end checking the second input===================================
var RegExp_Template = /^[0-9]+(,[0-9]+)*$/; // /^[0-9]{0,2}[\,]?\d*[\,]*$/;  ///^[0-9]{1,16}[\,]*[0-9]*\d$/;   //  /^[a-zA-Z0-9_-]{1,16}\.(gif|jpg|mp3)$/;   //only english letter or ints,(-_) name length (1-16), ends in(.(gif|jpg|mp3)   //was  /^[a-zA-Z]{1,16}$/;
	
// **************************************************************************************
// **************************************************************************************
//                                                                                     ** 

//OnChange value in input 2()-----------
//$(document).on("change", '.checkRegExp', function(e) {  //must have {e} to detect event //newly generated
$(".checkRegExp" ).on('input', function(e) {   
      myValidate($(this), this.id, RegExp_Template, '   only digits, separated by comma, no spaces, last input can not be comma', e);   //{e} new must have arg, otherwise not visible
});
 
//End  OnChange-------
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************








//Function that Validate inputs  on change (confirm delete 2nd arg (id)?????). So far, validates 2nd input only, the 1st input is type="number" in html
// **************************************************************************************
// **************************************************************************************
//                                                                                     ** 
function myValidate(thisX, id, regExp, message, e)  //{e} -. it is change event from {$(document).on("change", '.fileCheck', function(e) { }
{

     //if (e.target.files[0].name !=='')
     if ($("#" +id).val()!==''){
		
		
		//var fileName = e.target.files[0].name;  //gets the input file name
		//alert(fileName);
		
        //alert (id);
		//gets the input
        var idm = $("#" +id).val();   //alert('val is-> '+idm);    //$('input[type=file]').val()

        //if  REgEXp  match
        if (idm/*fileName*/.match(regExp)){
            thisX.prevAll(".sp:first").html('Correct');// erase  error  message //$("#" +id).prevAll(".sp:first").html('Correct');// erase  error  message
            $('#createHall')/*$(':input[type="submit"]')*/.prop('disabled', false); //enable  button  //$(':input[type="button"]').prop('disabled', false);
            $('#createHall').html('Create');
                      
         } else {  //if RegExp not  match
             thisX.prevAll(".sp:first").html(message);   //$("#" +id).prevAll(".sp:first").html(message);   //finds the 1st prev span
             $('#createHall')/*$(':input[type="submit"]')*/.prop('disabled', true);
             $('#createHall').html/*val*/('Disabled');
         }
     //  end if ($("#" +id).val()!==''){
   
     } else {//if  the input is empty, set no  error to span
         thisX.prevAll(".sp:first").html('');
		 $('#createHall').prop('disabled', false);
         $('#btnSubmit').html('Create');   
     } 
}
  
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
//
	
	
	
	
	
	// function to generate unique order number--------------------
	function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
       });
      }
	  // END  function to generate unique order number
  //-----------------------------------------------------------------
	
	
	
	
	//not working correctly
	function getHeight()
	{
		//gets last class round height 
	    var lastHeight = $(".round:last").height();
	    //alert("last height is " + lastHeight + " id ->" + $(".round:last").attr('id') + " legth-> " + $(".round").length);
		$("#err").append("<br>last height is " + lastHeight + " id ->" + $(".round:last").attr('id') + " legth-> " + $(".round").length); //instead of alert
		$(".round:last").html("777")
	}
	
	
	
	
	
	//ajax gets Halls name, address, rows and column seats from SQL DB
	// sends ajax to INNER JOIN  STATEMENT (in order to get info not only about Venue Seats Scheme(SQL Hall_Scheme_List_of_Venues), but also Event Name from (SQL Hall_Events)
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function get_ajax_VenueHall_Seats_Scheme_From_SQL(venueID)
	{
		  // send  data  to  PHP handler  ************ 
        $.ajax({
            url: 'ajax_php/myConcert_Get_Hall_SeatsValue_toDraw.php',
            type: 'POST',
			dataType: 'JSON', // without this it returned string(that can be alerted), now it returns object
			//passing the Venue ID
            data: { 
			    serverHall_Id: venueID  //hall id (as in SQL DB Hall_Scheme_List_of_Venues)
			},
            success: function(data) {
                // do something;
                console.log(data);
				x = data[0].place_vert_column; //gets vert column seats
				z = data[0].place_horz_rows;//.split(','); //gets horiz column seats
				
				venueZ = data[0].place_name;   //gets Global Venuehall Name (used to html in ticket order)
				priceX = data[0].ev_price;
				dateTicket = unix_to_normal(data[0].ev_date);
				//alert(z);
				$("#err").append("<br>" + z); //instead of alert
				
				checkSeatsInRowsValueInput(x, z); //runs/puts horiz column seats through validation, if they match array and if it's length==x = data[0].place_vert_column
				buildHallSeats(x, z, getHeight); //draw a Relevant hall
				
				calc_AllSeatsAmount_and_show_EventHeaderInfo(x,z,data);  // //args(input1_Vert, input2Array_Horiz, ajax_data)   //data must have for visibility
			
			   
            },  //end success
			error: function (error) {
				$("#status").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> NO Seats FOUND</h4>")}).fadeIn(2000);
            }	
        });
                                               
       //  END AJAXed  part 
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//function to get SQL EVENTS from {Hall_Events} SQL DB), selects ONLY with date which >= today, sends ajax to INNER JOIN to get Events List + VenueHall Name by ID 
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function get_ajax_Events_List_From_SQL() //
	{
		
		//alert($('#dateHistorical').val());
		//var UnixTime = (new Date($('#dateHistorical').val() )).getTime() / 1000;
		//alert("JS Unix " + UnixTime );
		
		
		 // send  data  to  PHP handler  ************ 
        $.ajax({
            url: 'ajax_php/myConcert_Get_Events.php',
            type: 'POST',
			dataType: 'json', // without this it returned string(that can be alerted), now it returns object
			//passing the city
            data: { 
			    serverDatePickerVal: $('#dateHistorical').val()  //passes date  from datepicker 13/10/2018
			},
            success: function(data) {
                // do something;
                alert(data.length + " events " +  JSON.stringify(data, null, 4));
				
				var eventsText = '';
              	for(i = 0; i < data.length; i++){
					//ID for event to use in SQL, i.e => LTJ Bukhem_1538683200_1 =>{eventName(from DB Hall_Events)_Unix(from DB Hall_Events)_venueID(from DB Hall_Scheme_List_of_Venues)}
					var idZ = data[i].ev_name + "_" + data[i].ev_date + "_" + data[i].place_id;  //form the id of each event, contains id = 'date_unix_venueID'
					
					//form the final text with Upcoming events
					eventsText = eventsText + "<div id='" + idZ + "' class='row event'>" + 
 					                              "<div class='col-sm-3 col-xs-4'>" + data[i].ev_name + "</div>" +   //Event name
											      "<div class='col-sm-3 col-xs-4'>&nbsp;<i class='fa fa-calendar-check-o'></i>" + new Date(data[i].ev_date * 1000).toLocaleString().slice(0,10) + "</div>" + //convert SQL Event UnixStamp to normal date {new Date(Unix * 1000)}, then {toLocaleString()}  to form {04.10.2018, 23:00:00} and {.slice(0,10)} to leave only 04.10.2018
											      "<div class='col-sm-3 col-xs-4'>&nbsp;<i class='fa fa-home'></i>&nbsp;" + data[i].place_name + ", " + data[i].place_address +"</div>" +  //Fa Lib icon +  venue name + address
				                              "</div>";
				}
				
				//event = data[0].ev_name; //event name    ,CD??
				//priceX = data[0].ev_price; //event price ,CD??
				//venueZ = data[0].place_name;
			    $("#upcomingEvents").stop().fadeOut("slow",function(){ $(this).html(eventsText)}).fadeIn(2000);
			   
            },  //end success
			error: function (error) {
				alert("Events Error");
				//$("#status").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> NO Events FOUND</h4>")}).fadeIn(2000);
            }	
        });
                                               
       //  END AJAXed  part 
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	
	//function to calc all seats + html info for selected Event, works either for SQL result or custom draft from yout form
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function calc_AllSeatsAmount_and_show_EventHeaderInfo(xx, zz, data)  //args(input1_Vert, input2Array_Horiz, ajax_data)
	{
		var nameZ;
		//if 3rd argument is NULL(i.e not used in NON-AJAX, when there is no data)
		if(!data){
			nameZ = "Custom draft";
			event = "Your custom Event!!!";
			dateZ = "Your custom Date";
			startTimeZ = "Your Time";
		} else {
			nameZ = data[0].place_name; //gets the Venue name from ajax SQL, from functon {get_ajax_VenueHall_Seats_Scheme_From_SQL(venueID)}
			event = data[0].ev_name; //gets Event name from ajax data
			dateZ = data[0].ev_date; //gets Event data from ajax data
			dateZ = unix_to_normal(dateZ); //new Date(dateZ * 1000).toLocaleString().slice(0,10);  // Date of event //convert SQL Event UnixStamp to normal date {new Date(Unix * 1000)}, then {toLocaleString()}  to form {04.10.2018, 23:00:00} and {.slice(0,10)} to leave only 04.10.2018
		    startTimeZ = data[0].ev_start_time; //start time
		}
	
		var allSeatsinHall = 0; //all seats amount
		for(i = 0; i < xx; i++){
		    allSeatsinHall = allSeatsinHall + parseFloat(zz[i]);
		}
		$("#hallInfo").html("<h4><i class='fa fa-home'></i>&nbsp;" + nameZ + "&nbsp&nbsp " +            //Venue name 
		                     "<i class='fa fa-vcard'></i>&nbsp;&nbsp" + event + "&nbsp&nbsp " +        //Event Name
							 "<i class='fa fa-calendar-check-o'></i>&nbsp;" + dateZ + "&nbsp&nbsp " + //Event Date
							 "<i class='fa fa-clock-o'></i>&nbsp;" + startTimeZ + "&nbsp&nbsp " + //Event Date
							 "<i class='fa fa-sitemap'></i>&nbsp;Places=> " + allSeatsinHall +        //Venue Hall all seats amount
							 "</h4>"); //insert before seats Hall name, address and places
	
	}  
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	//Function that shows/draw relevant Venue Hall, triggered by OnClick on the event in the Upcoming Event List
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function showRelevantVenueHall_withRelevantEvent(passedID)
	{
		//alert(passedID);  //id of clicked, i.e => LTJ Bukhem_1538683200_1 =>{eventName(from DB Hall_Events)_Unix(from DB Hall_Events)_venueID(from DB Hall_Scheme_List_of_Venues)}
		$("#err").append("<br>ID is " + passedID); //instead of alert
		var idValues = passedID.split("_"); //split id to eventName, eventUnix, venueID
		
		//draw Venue Hall with seats and relevant Event
		get_ajax_VenueHall_Seats_Scheme_From_SQL(idValues[2]);//passes Venue ID  //includes 3 function inside (checkSeatsInRowsValueInput(x, z) + buildHallSeats(x, z, getHeight) + calc_AllSeatsAmount_and_show_EventHeaderInfo(x,z,data)}
	
	    scrollResults("#hallInfo");
	
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	function unix_to_normal(unixZ)    //convert SQL Event UnixStamp to normal date {new Date(Unix * 1000)}, then {toLocaleString()}  to form {04.10.2018, 23:00:00} and {.slice(0,10)} to leave only 04.10.2018
	{
		return new Date(unixZ * 1000).toLocaleString().slice(0,10);
	}
	
	
	
	
	
	
	
	// Click button to Clear--------------
	$("#clear").click(function() { 
	    $("#status, #hallInfo").stop().fadeOut("slow",function(){ $(this).html('')}).fadeIn(1000);
	});
      
	
	
	
	
	
	   

	   
	   
	   
	   
	   
//=============================== DONOR =======================================================================
	   
	 // Scroll the page to results  #resultFinal
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function scrollResults(divName, parent)  //arg(DivID, levels to go up from DivID)
	{   //if 2nd arg is not provided while calling the function with one arg
		if (typeof(parent)==='undefined') {
		
            $('html, body').animate({
                scrollTop: $(divName).offset().top
                //scrollTop: $('.your-class').offset().top
             }, 'slow'); 
		     // END Scroll the page to results
		} else {
			//if 2nd argument is provided
			var stringX = "$(divName)" + parent + "offset().top";  //i.e constructs -> $("#divID").parent().parent().offset().top
			$('html, body').animate({
                scrollTop: eval(stringX)         //eval is must-have, crashes without it
                }, 'slow'); 
		}
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	 // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	
	function scroll_toTop() 
	{
	    $("html, body").animate({ scrollTop: 0 }, "slow");	
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	

});
// end ready	
	