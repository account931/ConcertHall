$(document).ready(function(){
	var x;
	var z  = [];
	var seatsTakenArray = ["1_2", "1_4", "4_3"]; //taken seats, emulates SQL result for taken seats
	
	//sets today to datepicker
	document.getElementById('dateHistorical').valueAsDate = new Date();
	
	
	
	// Click button to create Hall Seats according to your values---------------
	$("#createHall").click(function() { 
         z  = []; //clear the array
	    
		//checks if not empty
	    if( $("#vertcRows").val()=="" ||  $("#seatsInRows").val()=='' ){
		    alert("Can not be empty");
			return false;
		}	
		
		
		//checks correct input to field2(#seatsInRows). If may enter 1 digit(for all Vert) or several digits separated by comma for every Vert Row
		checkSeatsInRowsValueInput();
		
		
	   
		//build your Hall onClick
	    buildHallSeats(x, z, getHeight);  //as z can be array ONLY
		
		
		
    });
	
	
	
	// Click on any seat to buy---------------
	 $(document).on("click", '.round', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	     if(seatsTakenArray.indexOf(this.id) >= 0 ){ //if seatId is in array of taken places, receieved from SQL SELECT
	         alert(this.id + " is already booked");
		 } else {
			 if(confirm ("Buy ticket " + this.id + " ?")){
				 $("#myModalZ").modal("show");
				 $('#formTicketPlace').val("Row: " + this.id.split('_')[0] + " Seat:" + this.id.split('_')[1] + " (" + this.id + ")"); //sets the place of selected seat  generateUUID() 
				 $('#formTicketID').val(generateUUID()); //sets ticket id
				 $('#formTicketDate').val( $("#dateHistorical").val() ); //sets date from date pick up
			 //alert(this.id );
			 //send ajax to SQL to book
			 }
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
		var max = Math.max.apply(null, arrayHorizont); alert("Max Horiz seats value " + max);
		
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

   alert("tallest " + tallest);
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
	
	
	
	
	//bulid onLoad
	 buildHallSeats(3, [1, 2,], getHeight); //1st arg=>VerticalRows, 2nd arg=>array with seats in every Horizont Row
	 
	 
	 
	 
	 
	 
	 
	//checks correct input to field2(#seatsInRows). You may enter 1 digit(for all Vert) or several digits separated by comma for every Vert Row. If enetered more or less, it AUTOFIXES THE ARRAY
	// **************************************************************************************
    // **************************************************************************************
    // **                                                                                  **
    // **                                                                                  **

	 function checkSeatsInRowsValueInput()
	 {
		 
	      x = $("#vertcRows").val();
		  var y = $("#seatsInRows").val(); //users input, value for seats Hor
		
		
		  var patt = /\,/g; //RegExp for comma
		  var horizonInput = $("#seatsInRows").val();
		  //alert(horizonInput);
		  
		 //if comma is detected in 2nd input, i.e custom user values for H seats
		 if( patt.test(horizonInput)){
			 alert("Comma detected");
			 
			 //if user printed more or less values that requirs input1(input1.vertcRows = 3, input2.seatsInRows=3,2)
			 if(horizonInput.split(",").length!= $("#vertcRows").val()){
				 
				 //IF Users printed less values than required, (input1.vertcRows = 3, input2.seatsInRows = 3, 2)
				 if( horizonInput.split(",").length < $("#vertcRows").val()){
				     alert("Seats don't not match [Less]");
				     var difference = $("#vertcRows").val() - horizonInput.split(",").length; //alert("difference " + difference);
				     z = horizonInput.split(",");
				     for(i = 0; i < difference; i++){
					     z.push(z[z.length - 1]);	 //just adds to array Z last Z array element
				     }
					 alert(z);
				 }
				
				 
				 //IF Users printed more values than required, (input1.vertcRows = 3, input2.seatsInRows = 3, 2, 7, 8). Just take the first necessary inputs
				 if ( horizonInput.split(",").length > $("#vertcRows").val() ) {
					 alert("Seats don't not match [More]");
					 var b = horizonInput.split(",");
					 for(i = 0; i < x; i++){
			             z.push(b[i]);
		             } 
					 alert(z);
				 }
			 
             // If user printed equil amount			 
			 } else {
				 alert("Seats match");
				 z = horizonInput.split(",");
			 }
			 
		 } else {
			 //IF user enetered just 1 digit, autocomplete the array with this digit
			 //creates array(as 2nd arg can be array ONLY, fill it with value, to make sure z.lengh === x)
		     //var z =[];
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
	    alert("last height is " + lastHeight + " id ->" + $(".round:last").attr('id') + " legth-> " + $(".round").length);
		$(".round:last").html("777")
	}
	
	
	
	
	
	
	
	// Click button to Clear--------------
	$("#clear").click(function() { 
	    $("#status").stop().fadeOut("slow",function(){ $(this).html('')}).fadeIn(1000);
	});
      
	
	
	
	
	
	   

	
	
	

});
// end ready	
	