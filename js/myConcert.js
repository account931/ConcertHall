$(document).ready(function(){
	
	// Click button to create Hall Seats according to your values---------------
	$("#createHall").click(function() {   
	    var x = $("#vertcRows").val();
		var y = $("#seatsInRows").val(); //value for seats Hor
		
		//creates array(as 2nd arg can be array ONLY, fill it with value, to make sure z.lengh === x)
		var z =[];
		for(i = 0; i < x; i++){
			z.push(y);
		}
	    
		//build your Hall onClick
	    buildHallSeats(x, z);  //as z can be array ONLY
    });
	
	
	
	// Click seat---------------
	 $(document).on("click", '.round', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	    alert(this.id);
	 });
	
	
	
	var seatsTakenArray = ["1_2", "1_4"]; //taken seats, emulates SQL result for taken seats
	
	
	// **************************************************************************************
    // **************************************************************************************
    // **                                                                                  **
    // **                                                                                  **

	function buildHallSeats(vertRows, arrayHorizont)
	{
		//get arrayHorizont max element for automatic CSS width
		var max = Math.max.apply(null, arrayHorizont); alert("Max H seats value " + max);
		if(max < 17){
		    var widthX = 100 / (max + 5);
		} else {
			var widthX = 100 / (max + 30);
		}
		
		var final = "";
		for(i= 0; i < vertRows; i++){
			final = final + "<div class='row'>";  //<div class='col-sm-12 col-xs-12'>";
			
			for(j= 0; j < arrayHorizont[i]; j++){
				
				var seatID = (i + 1) + "_" + (j + 1);  //to form 1_2, 2_1  not 0_1, 2_0
				final = final + "<div class='col-sm-1 col-xs-1 round' style='width:" + widthX + "%' id=" + seatID + "><p>" + seatID + "</p></div>";
				
			}
			
			final = final + "</div>";
		}
		
		
		 $("#status").stop().fadeOut("slow",function(){ $(this).html(final)}).fadeIn(1000);
		
	}
	// **                                                                                  **
    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	//bulid onLoad
	 buildHallSeats(3, [4,5,5]);

});
// end ready	
	