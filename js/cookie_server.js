//should remove Ready section to get $this function visible in myConcert.js
	sendAjax_to_count_cookieBusket_quanity(); //counts ticket in php cookies to dispay in round badge top right
	
	
	
	
	
	
	
	
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
	

	

		
		
	
	// Click button to show all cookies ---------------
	 $(document).on("click", '#cookieIcon', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	     get_all_cookies_list();
    });
	
	
	
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
	