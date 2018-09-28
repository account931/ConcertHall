<?php

class RecordTxt {


// Used in PhpMAiler  and  default  mailer  for  recording  data;
//  So  far   ,  a  working  version   ,  takes  as  an  argument   array + variable ; 






// Universal function records  to  txt date,ip, UsAgent and  as  many $_GET/S_POST inputs u place (called in function as  an array)=>//RecordAnyInput(array('item1', 'item2', 'item3'), 'recodText/FilenameText.txt');
// **************************************************************************************
// **************************************************************************************
// **                                                                                  **
// **                                                                                  **

public static function RecordAnyInput($idArray, $filename){
     date_default_timezone_set("Europe/Kiev");
     $date=date("d.m.y.H:i");  //get date  and  User Agent and browser;
     $uAgent=$_SERVER['HTTP_USER_AGENT'];//$browser = get_browser(); //$browser not  working;
 
      $ip = $_SERVER['REMOTE_ADDR'];
                       //getting IP (profound)
                        /* if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
                             $ip = $_SERVER['HTTP_CLIENT_IP'];
                         } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                             $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
                         } else {
                             $ip = $_SERVER['REMOTE_ADDR'];
                         }*/
                       // END  getting  IP(profound)

     file_put_contents($filename, "\n \n-----------------------\n".$date. " - " .$ip. "\n".$uAgent,FILE_APPEND); //save  date,ip and  UsAgent;
     foreach ($idArray  as $itemSubj) {
        //echo $itemSubj."</br>";//commment  in production
        file_put_contents($filename, "\n".$itemSubj,FILE_APPEND);//save each array item  provided  ob calling  function;
     }//end  foreach;
}
//--------

// **                                                                                  **
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************



//Calling   function with  arguments(array  and  var.);
//RecordAnyInput(array('item1', 'item2', 'item3'), 'recodText/FilenameText.txt');












} // end  Class
























?>
