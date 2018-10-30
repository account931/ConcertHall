<?php

Class SendMail
{



   
   
//build PDF with FPDF Library and send email PDF to user using phpmailer.php
// **************************************************************************************
// **************************************************************************************
//                                                                                     **  
public function generate_ticket_PDF() 
{

/*	
require('../Library/PHP_PDF/fpdf.php');

$pdf = new FPDF('P', 'pt', array(500,233));
$pdf->AddFont('Times','','times.php');
$pdf->AddPage();
$pdf->Image('lib/fpdf/image.jpg',0,0,500);
$pdf->SetFont('Times','',16);
$pdf->Cell(40,10,'Hello World!');

// email stuff (change data below)
$to = "account931@ukr.net"; 
$from = "me@example.com"; 
$subject = "send email with pdf attachment"; 
$message = "<p>Please see the attachment.</p>";

// a random hash will be necessary to send mixed content
$separator = md5(time());

// carriage return type (we use a PHP end of line constant)
$eol = PHP_EOL;

// attachment name
$filename = "test.pdf";

// encode data (puts attachment in proper format)
$pdfdoc = $pdf->Output("", "S");
$attachment = chunk_split(base64_encode($pdfdoc));

*/

/*
// main header
$headers  = "From: ".$from.$eol;
$headers .= "MIME-Version: 1.0".$eol; 
$headers .= "Content-Type: multipart/mixed; boundary=\"".$separator."\"";

// no more headers after this, we start the body! //

$body = "--".$separator.$eol;
$body .= "Content-Transfer-Encoding: 7bit".$eol.$eol;
$body .= "This is a MIME encoded message.".$eol;

// message
$body .= "--".$separator.$eol;
$body .= "Content-Type: text/html; charset=\"iso-8859-1\"".$eol;
$body .= "Content-Transfer-Encoding: 8bit".$eol.$eol;
$body .= $message.$eol;

// attachment
$body .= "--".$separator.$eol;
$body .= "Content-Type: application/octet-stream; name=\"".$filename."\"".$eol; 
$body .= "Content-Transfer-Encoding: base64".$eol;
$body .= "Content-Disposition: attachment".$eol.$eol;
$body .= $attachment.$eol;
$body .= "--".$separator."--";

// send message
mail($to, $subject, $body, $headers);

*/







//Creating a PDF FILE
//PDF Libary		
require_once( "../Library/PHP_PDF/fpdf.php" ); //include FPDF Library

//QR Library
require_once( "../Library/PHP_QR_Library/phpqrcode/qrlib.php" ); //include FPDF Library
		
// Start of PDF Configuration-> arrays with configs(just values, instead u can use values hardcoding)
$textColour = array( 0, 0, 0 );
$headerColour = array( 100, 100, 100 );
$tableHeaderTopTextColour = array( 255, 255, 255 );
$tableHeaderTopFillColour = array( 125, 152, 179 );
$tableHeaderTopProductTextColour = array( 0, 0, 0 );
$tableHeaderTopProductFillColour = array( 143, 173, 204 );
$tableHeaderLeftTextColour = array( 99, 42, 57 );
$tableHeaderLeftFillColour = array( 184, 207, 229 );
$tableBorderColour = array( 50, 50, 50 );
$tableRowFillColour = array( 213, 170, 170 );
$reportName = "Your Ticket";
$reportNameYPos = 160;
$logoFile = "../images/ticket.jpg";
$logoXPos = 50;
$logoYPos = 12;
$logoWidth = 114;
$columnLabels = array( "Q1", "Q2", "Q3", "Q4" );
$rowLabels = array( "SupaWidget", "WonderWidget", "MegaWidget", "HyperWidget" );
$chartXPos = 20;
$chartYPos = 250;
$chartWidth = 160;
$chartHeight = 80;
$chartXLabel = "Product";
$chartYLabel = "2009 Sales";
$chartYStep = 20000;

$chartColours = array(
                  array( 255, 100, 100 ),
                  array( 100, 255, 100 ),
                  array( 100, 100, 255 ),
                  array( 255, 255, 100 ),
                );

$data = array(
          array( 9940, 10100, 9490, 11730 ),
          array( 19310, 21140, 20560, 22590 ),
          array( 25110, 26260, 25210, 28370 ),
          array( 27650, 24550, 30040, 31980 ),
        );
// END of Configuration

//build a pdf page
$pdf = new FPDF( 'P', 'mm', 'A4' );
$pdf->SetTextColor( $textColour[0], $textColour[1], $textColour[2] );

/*
$pdf->AddPage();
//add logo
$pdf->Image( $logoFile, $logoXPos, $logoYPos, $logoWidth );
//set fonts
$pdf->SetFont( 'Arial', 'B', 24 );
//add text
$pdf->Ln( $reportNameYPos );
*/

$pdf->AddPage();

//add image
$pdf->Image( $logoFile, $logoXPos, $logoYPos, $logoWidth );
//set fonts
$pdf->SetFont( 'Arial', 'B', 14 );
//add text
$pdf->Ln( 44 );


$pdf->SetTextColor( $headerColour[0], $headerColour[1], $headerColour[2] );
$pdf->SetFont( 'Arial', '', 17 );
$pdf->Cell( 0, 15, $reportName, 0, 0, 'C' ); //header

//start header text 
$pdf->SetTextColor( $textColour[0], $textColour[1], $textColour[2] );
$pdf->SetFont( 'Arial', '', 20 );
$pdf->Write( 19, "PDF Ticket" );
$pdf->Ln( 12 );  //blankspace line with height 12

//add Ticket text
$pdf->Ln( 5 );
$pdf->SetFont( 'Arial', '', 12 );
$venue = "Venue: " . $_POST['serverVenue'];
$pdf->Write( 6,  $venue  ); //6 is a height

$pdf->Ln( 5 );
$dateX = "Date: " . $_POST['serverDateNormal'];
$pdf->Write( 6,  $dateX  ); //6 is a height

//adds QR code
$pdf->Ln( 5 );
$qrTextX = "myText";
QRcode::png($qrTextX, 'filename.png'); // creates QR img file using -> Library/PHP_QR_Library/phpqrcode/qrlib.php
$pdf->Image('filename.png' ,10,6,30); //adds qR to PDF

//

//$pdf->Image($barCodeLink ,0,0,0,0,'PNG');
//$pdf->Image(  'mm.jpg', $logoXPos, $logoYPos, $logoWidth );



$pdf->Ln( 12 );
$pdf->Write( 6, "2010 is expected to see increased sales growth as we expand into other countries." );

//display/download 
$pdfdoc = $pdf->Output( "report.pdf", "I" ); //I - display to screen, D -download, S - don't show to screen(used in mailing)

//Send PDF as an attachment via e-mail
//$this->send_PhpMAiler($attachment);


         
	}
   // **                                                                                  **
   // **************************************************************************************
   // **************************************************************************************
   








   
   
   
//send PhpMAiler email with PDF to user
// **************************************************************************************
// **************************************************************************************
//                                                                                     **  
public function send_PhpMAiler($attachmentX) 
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
		 $mail->AddAttachment($attachmentX);
        //end  attachment
              
        //$mail->AddAttachment("file_adress", 'file_name'); // attach  file  if  required
        $mail->IsHTML(true); // setting HTML  flag
        $mail->Subject = $phpMailTheme;
        $mail->Body = $phpMailBody;
		
       //sending;
       if(!$mail->Send()){
           echo "Message was not sent";
           echo "Mailer Error: " . $mailer->ErrorInfo;
       } else {
		   echo"<center><p id='phpMailerTextDestroyer'>Message  is  send</p></center>";
	   }
	//}
}
// **                                                                                  **
// **************************************************************************************
// **************************************************************************************
   
   
   
   
   
   
   
   







}

?>
