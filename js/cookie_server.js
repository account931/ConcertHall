//$(document).ready(function(){
	
	
//should remove Ready section to get $this function visible in myConcert.js
	//sendAjax_to_count_cookieBusket_quanity(); //counts ticket in php cookies to dispay in round badge top right
	
	var productsObject;
	 check_if_localStorage_exists();
	 count_localStorage_quanity(); //counts ticket in LocalStorage
	
	
	// Click button to show all cookies ---------------
	 $(document).on("click", '#cookieIcon', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	     get_all_tickets_from_LocalStorage_list();
    });
	
	
	
	// Click button to show all cookies ---------------
	 $(document).on("click", '.download_PDF_from_List', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	     download_pdf_from_local_storage();
    });
	
	
	
	//checks if LS exists, if not create it
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function check_if_localStorage_exists(){
		// FALSE - Initialize OBJECT productsObject, was in myCore, but thus was executed there with delay and Line 46 here was failing
        //checking if object for all product exist and creat it if not
        /*window.*/productsObject;
       // Check if Object was already saved in Local Storage, if not - creat it
       if (localStorage.getItem("localTicketStorageObject991") != null) { // If Local Storage was prev created and exists
		    var retrievedObject = localStorage.getItem('localTicketStorageObject991'); // get Loc Storage item
			var retrievedObject = JSON.parse(retrievedObject);
			productsObject = retrievedObject;
			//refreshCartIcon (); // recalc the header cart icon, had to outline it out of ready section, as it was invisible
			alert ("Loc St exists" + JSON.stringify(productsObject, null, 4) + " length: " + Object.keys(productsObject).length);
       } else {
        
		// if Loc Storage does not exist (i.e Object was never initialized), create a new Object
	    if (typeof productsObject == "undefined") {
            alert("Object will be created now");
		    productsObject = { }; //empty object for all cart products
        } else {
		    alert("Object Exists"); // will never fire
	    }
	}	

		
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	

	
	
	
	
	
	
	
		//adds tickets to Local Storage
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function add_ticket_Local_Storage(dataX){
		    var prodName = dataX.UUID; //Mega FIX, MUST BE unique
		    productsObject[prodName] = {};
			productsObject[prodName]['name'] =  dataX.UserName;
			productsObject[prodName]['email'] = dataX.UserMail;
			productsObject[prodName]['event'] = dataX.EventName;
			productsObject[prodName]['venue'] = dataX.VenueName;
			productsObject[prodName]['datenorm'] = dataX.DateNorm;
			productsObject[prodName]['time_start'] = dataX.TimeStartt;
			productsObject[prodName]['seat'] = dataX.TicketPlace;
			productsObject[prodName]['price'] = dataX.Price;
			productsObject[prodName]['uuid'] = dataX.UUID;
			alert(JSON.stringify(productsObject, null, 4)); //to alert OBJECT
		
		// Save OBJECT to LocalStorage
			localStorage.setItem('localTicketStorageObject991', JSON.stringify(productsObject)); // Parse Object to string and save to LStorage
			//var retrievedObject = localStorage.getItem('localStorageObject'); // get Loc Storage item
			//var retrievedObject = JSON.parse(retrievedObject); // turn LC string item to object type again
			//alert("Loc ST " + JSON.stringify(retrievedObject, null, 4));
		
		    alert(" length: " + Object.keys(productsObject).length);
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	//counts ticket in php cookies to dispay in round badge top right
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function count_localStorage_quanity()
	{
		var ll = Object.keys(productsObject).length;
		//$("#err").append("<br>LS Object->count: " + ll); //instead of alert
		
        $('.badge').attr('data-badge',20);	
		$('.badge').data('data-badge',20); 
		//$('#bbb').attr('data-badge', ll  ); //update round badge with quantity //use -1 as 1st cookie attay el is empty
		//$('#bbb').html("s");
		//alert(ll);
	}
	
	
	
	
	
	
	
	
	
	
	

	//gets the whole list from LS
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function get_all_tickets_from_LocalStorage_list()
	{
		
	    $("#myModal_Cookies").modal("show"); //show modal with ready PDF TICKET
		$("#historyCount").html(Object.keys(productsObject).length); //ob length
		
		var finalText = "";  // word-wrap: break-word to prevent text overlapping
		for (var key in productsObject) {
			
			//var addID = key; // alert (addID);
			var barCodeLink = "https://chart.googleapis.com/chart?chs=60x60&cht=qr&chl=" + productsObject[key]['uuid'] + "&choe=UTF-8"; //form the link to QR API
			finalText = finalText + 
			            "<div class='row' style='word-wrap: break-word;'>" +
						    //"<div class='col-sm-4 col-xs-3'>" + key + "</div> " +
						    "<div class='col-sm-2 col-xs-3'>" + productsObject[key]['name']  + "</div> " +
						    "<div class='col-sm-2 col-xs-3'>" + productsObject[key]['email'] + "</div> " +
							"<div class='col-sm-2 col-xs-3'>" + productsObject[key]['event'] + "</div> " +
							"<div class='col-sm-2 col-xs-3'>" + productsObject[key]['venue'] + "</div> " +
							"<div class='col-sm-2 col-xs-3'>" + productsObject[key]['datenorm'] + "</div> " +
							"<div class='col-sm-2 col-xs-3'>" + productsObject[key]['time_start'] + "</div> " +
							"<div class='col-sm-2 col-xs-3'>" + productsObject[key]['seat'] + "</div> " +
							"<div class='col-sm-2 col-xs-3'>" + productsObject[key]['price'] + "</div> " +
							"<div class='col-sm-2 col-xs-3'>" + productsObject[key]['uuid'] + "</div> " +
							"<div class='col-sm-2 col-xs-4'>" + "<img crossOrigin='Anonymous' id='' src=" + barCodeLink  + " title=" + productsObject[key]['uuid'] + " alt='barcode' />" + "</div> " +
						    "<div class='col-sm-1 col-xs-4'>" + "<a href='' class='download_PDF_from_List'>PDF</a>" + "</div> " +
						"</div><hr></br></br>";
		}
		finalText = finalText + "</div>";
		
		$("#cookies_content").stop().fadeOut("slow",function(){ $(this).html(finalText)}).fadeIn(2000); //html all cookies

	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function download_pdf_from_local_storage()
	{
		
		   
        return false;
		
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	
	/*
	//counts ticket in php cookies to dispay in round badge top right
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function sendAjax_to_count_cookieBusket_quanity()
	{
		
		// send  data  to  PHP handler  ************ 
        $.ajax({
            url: 'ajax_php/Cookie_Busket_count.php',
            type: 'POST',
			dataType: 'json', // without this it returned string(that can be alerted), now it returns object
			//passing the data
            data: { 
			    //serverName:  $('#formUserName').val(),  //passes Name
			},
            success: function(data) {
                // do something;
				console.log(data);
				//alert("$_Coolies->count: " + data.q);
				$("#err").append("<br>$_Cookies->count: " + data.q); //instead of alert
				
				$('.ticketInfo').attr('data-badge', data.q - 1  ); //update round badge with quantity //use -1 as 1st cookie attay el is empty
            },  //end success
			error: function (error) {
				alert("Cookies Counting Failed!!!!!");
				//$("#status").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> NO Events FOUND</h4>")}).fadeIn(2000);
            }	
        });
                                               
       //  END AJAXed  part 
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	*/
	
	
	
	
	
	
	/*
	// WILL NOT USE IT ANY MORE????  - Reassigned to  ajax_php/myConcert_Buy.php-> inserted inside {$buyTicket ->Buy_Ticket_Action()}
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function add_ticket_to_Cookies()
	{
		//check if checkbox is ticked---
		var checkBoxVal;
		if($("#checkX").is(":checked")){
			checkBoxVal = true;
		} else {
			checkBoxVal = false;
		}
		
		$("#err").append("<br>Checkbox is on: " + checkBoxVal); //instead of alert
		//END check if checkbox is ticked----
		
		
		
		// send  data  to  PHP handler  ************ 
        $.ajax({
            url: 'ajax_php/Cookie_Busket_Add.php',
            type: 'POST',
			dataType: 'json', // without this it returned string(that can be alerted), now it returns object
			//passing the city
            data: { 
			    serverName:  $('#formUserName').val(),  //passes Name
				serverEmail: $('#formUserEmail').val(),  //passes Name
				serverDate:        dateUnix,  //passes Unix Date!!!!!!
				serverDateNormal:  unix_to_normal(dateUnix),  //passes Unix Date!!!!!!
				serverEvent:       event,  //passes event name
				serverVenue:       venueZ,  //passes Venue name
				serverTicketPlace: seatID,  //passes Venue name
				serverPrice:       priceX,
				serverStartTime:   startTimeZ,
				serverCheckBox:    checkBoxVal  //the value of cookies checkbox(true, false)
			},
            success: function(data) {
                // do something;
				alert(data);
				sendAjax_to_count_cookieBusket_quanity(); //renew the quantity in round icon/badge
				
            },  //end success
			error: function (error) {
				alert("Ading to Cookies failed!!! An error occured");
				//$("#status").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> NO Events FOUND</h4>")}).fadeIn(2000);
            }	
        });
                                               
       //  END AJAXed  part 
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	*/

	

		
		
	
	
	
	/*
	//gets the whole list of all ticket cookies
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function get_all_cookies_list()
	{
		//alert(333333333);
	    $("#myModal_Cookies").modal("show"); //show modal with ready PDF TICKET
		
		// send  data  to  PHP handler  ************ 
        $.ajax({
            url: 'ajax_php/Cookie_Busket_Get_List.php',
            type: 'POST',
			dataType: 'json', // without this it returned string(that can be alerted), now it returns object
			//passing the city
            data: { 
			    //serverName:  $('#formUserName').val(),  //passes Name
			},
            success: function(data) {
                // do something;
				console.log(data);
				//alert(data.length);
				
				
				var f = "";
				for(i = 1; i < data.length; i++){ //1 to to avoid 1st empty cookie
				
				    var barCodeLink = "https://chart.googleapis.com/chart?chs=60x60&cht=qr&chl=" + data[i][9] + "&choe=UTF-8"; //form the link to QR API
					
					f +=  "<div class='row'>" + 
					          "<div class='col-sm-1 col-xs-3'>" + data[i][0] + "</div>" +   //Venue
        				      "<div class='col-sm-1 col-xs-3'>" + data[i][1] + "</div>" +   //Event
						      "<div class='col-sm-2 col-xs-3'>" + data[i][3] + "</div>" +   //Date
							  "<div class='col-sm-1 col-xs-3'>" + data[i][6] + "</div>" +   //Name
							  "<div class='col-sm-1 col-xs-4'>" + data[i][5] + "</div>" +   //Seat
						      "<div class='col-sm-1 col-xs-4'>" + "<img crossOrigin='Anonymous' id='' src=" + barCodeLink  + " title=" + data[i][9] + " alt='barcode' />" + "</div> " +   //QR    
                              //"<div class='col-sm-2 col-xs-1'>" + data[i][9] + "</div> " +   //UUID					  
						      "<div class='col-sm-1 col-xs-4'>" + "<a href=''>PDF</a>" + "</div> " +
						  "</div><hr><br><br>";
				}
				f += "<a href=''>Delete all Cookies</a>";
				$("#historyCount").html(data.length -1);
			    $("#cookies_content").stop().fadeOut("slow",function(){ $(this).html(f)}).fadeIn(2000); //html all cookies
				
            },  //end success
			error: function (error) {
				alert("Building All Cookies List failed!!! An error occured");
				//$("#status").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> NO Events FOUND</h4>")}).fadeIn(2000);
            }	
        });
                                               
       //  END AJAXed  part 
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	*/
	
	
	
	
	
	
	
	
//});
// end ready	
	