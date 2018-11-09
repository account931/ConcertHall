<?php

Class SendMail
{

  
   
  //build PDF with FPDF Library and send email PDF to user using phpmailer.php
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
  public function generate_ticket_PDF_and_sendEmail() 
  {

  //creates PDF with QR
  $pdf = new Create_PDF_with_QR();
  $arg = "S";
  $pdf->create_pdf_qr($arg); //pdfDisplayMode can be: I - display to screen, D -download, S - don't show to screen(used in mailing)

  //Send PDF as an attachment via e-mail
  $this->send_PhpMAiler(/*$attachment*/);


         
  }
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
   








   
   
   
  //send PhpMAiler email with PDF to user
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
  public function send_PhpMAiler(/*$attachmentX*/) 
  {

       
       // Start PhpMAiler ******************************************************
       require_once("../Library/PHPMailer-master/class.phpmailer.php"); // Class

        //if(isset($_POST['mailSendPhpMail'])) { //press  the  button 
                                      
        $phpMailTo = "account931@ukr.net";                       //$_POST['recieverPhpMail']; //to
        $phpMailTheme = "Yout Ticket"; //$_POST['themePhpMail']; //theme
        $phpMailBody = "See your PDF ticket in the attachment";            //$_POST['textPhpMail'];   //body
        $phpMailFromEmail = "account931@ukr.net";                          //$_POST['fromPhpMail'];   //from e-email
        $phpMailFromName = "Ticket Admin";                                 //$_POST['fromPhpMailname'];
        //if(isset($_POST['fromPhpMailname'])) {$phpMailFromName=$_POST['fromPhpMailname'];}  else {$phpMailFromName='User';}    //from name if  initial is  empty

        $mail = new PHPMailer(); 
        $mail->From = $phpMailFromEmail; //From  who 
        $mail->FromName = $phpMailFromName;//Wrom  who  name
        $mail->AddAddress($phpMailTo);  // to  whome  //($phpMailTo, "/*name*/");
        $mail->CharSet = 'UTF-8'; // 
         
        //start  attachment
		/*
        if (isset($_FILES['filePhpMail']) && $_FILES['filePhpMail']['error'] == UPLOAD_ERR_OK) {
            $mail->AddAttachment($_FILES['filePhpMail']['tmp_name'],
                                 $_FILES['filePhpMail']['name']);
         }
		 */
		 $mail->AddAttachment('ticket.pdf'); //attach pdf file
		 //$mailer->AddStringAttachment($attachment, 'ticket.pdf');  //attach pdf file
        //end  attachment
              
        //$mail->AddAttachment("file_adress", 'file_name'); // attach  file  if  required
        $mail->IsHTML(true); // setting HTML  flag
        $mail->Subject = $phpMailTheme;
        $mail->Body = $phpMailBody;
		
       //sending;
       if(!$mail->Send()){
		   $mailResult = "Mail sending Failed";
           //echo "Message was not sent";
           //echo "Mailer Error: " . $mailer->ErrorInfo;
       } else {
		   //echo"<center><p id='phpMailerTextDestroyer'>Message  is  send</p></center>";
		   $mailResult = "Mail was sent";
	   }
	   echo json_encode($mailResult);
	//}
}
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
   
   
   
   
   
   
   
   







}

?>
