ConcertHall
SQL-BD used: Hall_Events  + Hall_Free_taken_seats + Hall_Scheme_List_of_Venues
Booking tickets + Custom form to creat your custom ampunt of seats(V Rows and H seats)


Known issues:
#when using ajax to address SQL CLASS, in ajax should be {dataType: 'JSON',} and php Should not contain any echoes, except for {echo json_encode($rowF);}