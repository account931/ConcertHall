Concert Hall
How it works:


  #Works on 3 Sql DBs: Hall_Events(keeps all events with UnixTime, name, venueId(used as foreign key in Inner Join)), 
Hall_Scheme_List_of_Venues (keeps venue name,scheme (rows,columns)), 
Hall_Free_taken_seats (keeps places that are taken,(along with UnixTime, venueId(foreign key for Inner),eventId(forign key))).

  #On zzz host DBs are located in account " account931"

  
  #onLoad function  {get_ajax_Events_List_From_SQL()} sents ajax to ajax_php/myConcert_Get_Events.php-> Select_Events Class.php, 
which SELECT all events with UnixTime greater than today. SELECT uses INNER JOIN on DB Hall_Scheme_List_of_Venues to get VENUE NAME = TRUE;
When creating all Events list in ajax {success}, we assign each event a unique id="eventName_UnixTime_VenueId"(e.g "Ed Rush_087775600_1").
As some Events name (like Ed Rush) may contain backspace, which is not allowed in id, 
We encode/decode it (checks if there is any blankspace in EventName, replace it with "/" while assigning Ids and decode (replace "/" with blankspace while html-ing id (i.e Event name) to div.



  #When u click on any Event in Event list (class="event"), it triggers function {showRelevantVenueHall_withRelevantEvent(this.id)},
which runs function  {get_ajax_VenueHall_Seats_Scheme_From_SQL(eventID) //eventID is an ID of clicked event-> (event_unix_venID)(Bukem_8600059_2);
SELECT uses INNER JOIN but it is not NEEDED HERE.
It passes eventID ID as arg (i.e arg is {this.id)}. 
This function  includes 3 other function inside:
(checkSeatsInRowsValueInput(x, z) + buildHallSeats(x, z, getHeight) + calc_AllSeatsAmount_and_show_EventHeaderInfo(x,z,data)}.



  #Function {checkSeatsInRowsValueInput(x, z)}, args= (VeticColumns,HorizRowsArray) makes sure that the 2nd arg (z) is an array,
which contains relenant amount of Horiz seats per each Vert Column (i.e (4, [ 2,3,4,4])). 
U can input  just 1 digit in 2nd arg and function autocompletes the array with same digits. 
Or u can put less/more array elements and they will be adjusted by the function.



  #Function buildHallSeats(x, z, getHeight),(args=(VeticColumns,HorizRowsArray)), calculates the biggest value in array of Horiz Rows (i.e in 2nd arg "z") 
  to autocreate css width of Horiz seats (with help of {var coeficient}), 
then checks array seatsTakenArray[], which contains SQL result of taken/booked places. 
Then in double for{} loop, creates specific id (3_4) for each seat, and checks if current place (i.e 3_4) is in seatsTakenArray[], 
and forms coherent HTML place display with relevant css classes (.free/.taken).



  #Function {calc_AllSeatsAmount_and_show_EventHeaderInfo(xx, zz, data)} 
Args =(input1_Vert, input2Array_Horiz, ajax_data) calculates whole amount of seat places for a given venue with for {} loop. 
And forms global vars(by splitting passed as arg clickedEventId=>(eventName_unix_venID_evTime_evPrice), i.e (Bukem_86006600_2_25_19.30)): 
eventName, eventDate, which are used in user"s ticket modal window form and function {run_ajax_to_Buy_Ticket()}.
If 3rd arg is not set (i.e in custom form), NULL is used as arg.



  #U can not click on a .taken class (It onlu returns alert (Taken'')). 
If u click on .free class ,  script opens BS modal window (buyTicket window) with event details + inputs that suggests user to print his name/email.
If user compiles, "Buy" button triggers {function run_ajax_to_Buy_Ticket()},
which sends ajax to {ajax_php/myConcert_Buy_Ticket.php->Classes/Buy_Ticket.php} to INSERT record to DB {Hall_Free_taken_seats}.  
Classes/Buy_Ticket.php generates UUID(unique ticket number), make sure it is unique(if not in DB already),
then makes sure the place is really free (SELECT returns NULL) and makes INSERT. 
After it, Js renew the function {showRelevantVenueHall_withRelevantEvent(id_eventID)}; to display updated taken venue seats. 
Arg {id_eventID} is set in showRelevantVenueHall_withRelevantEvent itself.
{id_eventID} is a Clicked EventId=>(eventName_unix_venID_evTime_evPrice), i.e (Bukem_86006600_2_25_19.30))

  #Additionally, function {run_ajax_to_Buy_Ticket()} on ajax SUCCESS runs function {display_PDF_Ticket(ajax_data)}, 
which shows in a new modal a ready Ticket with data from {json_encode($ticketPdfInfo) in Classes/Buy_Ticket.php} and + QR +buttons "Save PDF", "Save as img"
Saving as image button(id="btnSavePDF_to_IMG) uses Library/FileSaver.js + Library/dom-to-image.min.js
Saving as PDF button(id="btnPrintPDF) just prompts printing which requires prev saving th pdf.


  #function {run_ajax_to_Get_Taken_Seats()}  sends ajax to {ajax_php/myConcert_Get_BookedSeats.php->Classes/Select_Booked_Seats.php}
and select all taken seats for a given unixtime, venue and event. 
Ajax in {success}, clears prev values and forms the {seatsTakenArray[]}, array with taken places (1_1, 2_3)
Function {run_ajax_to_Get_Taken_Seats()} is used as callback in {function buildHallSeats(vertRows, arrayHorizont, callbackZ, callbackGetBooked) //callbackGetBooked ==>function run_ajax_to_Get_Taken_Seats()},
to make sure that firstly we get taken seats array and then start building the Scheme based on taken places array.
Additionally, Function {run_ajax_to_Get_Taken_Seats()} is set to {async:false} not to overlap the buildHallSeats().
 

 #IOS FIX -> clicking on was not working on IOS, the fix is to add CSS {cursor:pointer} to the element(not :hover)!!!
 
 #Save PDF -> pf is generated/saved with jspdf.min.js, Library/JS_PDF_library/jspdf.min.js -> UPD: NOT ANY MORE, downloaded with PHP FPDF LIB
 
 #Calendar click ->different CSS for past event and future events(if user clicked old date).When user selects a specific date from calendar, the same as onLoad function {get_ajax_Events_List_From_SQL()} is run. 
 The value of calendar pickup is passed (as 13/10/2018) through ajax to {ajax_php/myConcert_Get_Events.php}, php handler converts it to UnixTime and SELECT events with UnixTime greater than passed.
 onSuccess {get_ajax_Events_List_From_SQL()} generates yesterday UnixTime {var tsYesterday}, and if SQL Event UnixTime is less than {var tsYesterday}(if user clicked old date in Calendar), we mark this event as gone(class="event-past")
 
 
  #Function  unix_to_normal(unixZ) //convert SQL Event UnixStamp to normal date {new Date(Unix * 1000)}, 
then {toLocaleString()} to form {04.10.2018, 23:00:00} and {.slice(0,10)} to leave only 04.10.2018

 
 
#scrollResults(divName, parent) is an Advanced acroll function.


  #Security: to ensure that INSERT booked seat php script can be reached from authorized js Ajax only:  
in ajax ctreate $_SESSION ["token1234"], in php checka if $_SESSION ["token1234"] is set, if TRUE runs INSERT and unset ( $_SESSION ["token1234"]);


#With custom form u can create a custom Hall Venue seats Scheme. 1st input- Vert columns, 2nd-Horiz seats.

  #Rex exp validation for Input of Horiz Seats is performed with function myValidate(thisX, id, regExp, message, e).
 The Reg exp pattern: u can input a single digit or digits separated with comma. Comma can not be the last value in input. 

===============================================================================================================================

Known issues:
#when using ajax to address SQL CLASS, in ajax should be {dataType: 'JSON',} and php Should not contain any echoes, except for {echo json_encode($rowF);}

Unix problem //on Local host provides day -1 
Auto add events
Inner Join
How to add event


============================================================================================================

Libraries:
1. Dom_Image_library
2. FileSaver_libary
3. JS_PDF_library
4. PHP_PDF
5. PHP_QR_Library
6. PHPMailer-master