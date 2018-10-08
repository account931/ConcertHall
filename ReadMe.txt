ConcertHall:
How it works:

#Works on 3 Sql DBs: Hall_Events(keeps all events with UnixTime, name, venueId(used as foreign key in Inner Join)),  Hall_Scheme_List_of_Venues (keeps venue name,scheme (rows,columns)), Hall_Free_taken_seats (keeps places that are taken,(along with UnixTime, venueId(foreign key for Inner),eventId(forign key))).
On zzz host DBs are located in account " account931".

#onLoad function  {get_ajax_Events_List_From_SQL()} sents ajax to ajax_php/myConcert_Get_Events.php-> Select_Events Class.php, which SELECT all events with UnixTime greater than today. SELECT uses INNER JOIN on DB Hall_Scheme_List_of_Venues to get VENUE NAME.

#When u click on any Event in Event list (class="event"), it triggers function {showRelevantVenueHall_withRelevantEvent(this.id)}, which runs function  {get_ajax_VenueHall_Seats_Scheme_From_SQL(idValues[2])};//passes Venue ID as arg (i.e arg is {this.id)}. This function  includes 3 function inside (checkSeatsInRowsValueInput(x, z) + buildHallSeats(x, z, getHeight) + calc_AllSeatsAmount_and_show_EventHeaderInfo(x,z,data)}.

#Function {checkSeatsInRowsValueInput(x, z)}, args= (VeticColumns,HorizRowsArray) makes sure that the 2nd arg (z) is an array, which contains relenant amount of Horiz seats per each Vert Column (i.e (4, [ 2,3,4,4])). U can input  just 1 digit in 2nd arg and function autocompletes the array with same digits. Or u can put less/more array elements and they will be adjusted by the function.

#Function buildHallSeats(x, z, getHeight),(args=(VeticColumns,HorizRowsArray)), calculates the biggest value in array of Horiz Rows (i.e in 2nd arg "z") to autocreate css width of Horiz seats (with help of {var coeficient}), then checks array seatsTakenArray[], which contains SQL result of taken/booked places. Then in double for{} loop, creates specific id (3_4) for each seat, and checks if current place (i.e 3_4) is in seatsTakenArray[], and forms coherent HTML place display with relevant css classes (.free/.taken).

# function {calc_AllSeatsAmount_and_show_EventHeaderInfo(xx, zz, data)} //args(input1_Vert, input2Array_Horiz, ajax_data) calculates whole amount of seat places for a given venue with for {} loop. And forms global vars: eventName, eventDate, which are used in user"s ticket midal window form.
If 3rd arg is not set (i.e in custom form), NULL is used as arg.

#U can not click on a .taken class (It onlu returns alert (Taken'')). If u click on .free class ,  script opens BS modal window (buyTicket window) with event details + inputs that suggests user to print his name/email.
If user compiles, script sends ajax to $$$ to INSERT record to DB {Hall_Free_taken_seats}.  $$$$ Php makes sure the place is really free (SELECT returns NULL), then generates UUD (unique ticket number), checks if this UUD is not in DB and makes INSERT. After Js renew the function {get_ajax_VenueHall_Seats_Scheme_From_SQL(idValues[2])}; to display updated hall seats.


#Function  unix_to_normal(unixZ) //convert SQL Event UnixStamp to normal date {new Date(Unix * 1000)}, then {toLocaleString()} to form {04.10.2018, 23:00:00} and {.slice(0,10)} to leave only 04.10.2018


# scrollResults(divName, parent) is an Advanced acroll function.



#Security: to ensure that INSERT booked seat php script can be reached from authorized js Ajax only:  in ajax ctreate $_SESSION ["token1234"], in php checka if $_SESSION ["token1234"] is set, if TRUE runs INSERT and unset ( $_SESSION ["token1234"]);

#With custom form u can create a custom Hall Venue seats Scheme. 1st input- Vert columns, 2nd-Horiz seats.

#Rex exp validation for Input of Horiz Seats is performed with function myValidate(thisX, id, regExp, message, e).The Reg exp pattern: u can input a single digit or digits separated with comma. Comma can not be the last value in input. 

===============================================================================================================================

Known issues:
#when using ajax to address SQL CLASS, in ajax should be {dataType: 'JSON',} and php Should not contain any echoes, except for {echo json_encode($rowF);}

Unix problem //on Local host provides day -1 
Auto add events
Inner Join
How to add event