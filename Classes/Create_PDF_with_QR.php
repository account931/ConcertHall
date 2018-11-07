<?php
Class Create_PDF_with_QR
{

  //public $attachment;

   
   
  //build PDF with tFPDF Library(cyrillic language support) and  qrlib Library
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
  public function create_pdf_qr($pdfDisplayMode)  //pdfDisplayMode can be: I - display to screen, D -download, S - don't show to screen(used in mailing)
  {

      //Creating a PDF FILE with QR and ticket details and download pdf. Triggered by accessing via <a href> from $("#btnPrintPDF").click(function() { 
      //PDF Libary		
      require_once( "../Library/PHP_PDF/fpdf181/fpdf.php" ); //include FPDF Library, //adding cyrillic language support

      //QR Library
      require_once( "../Library/PHP_QR_Library/phpqrcode/qrlib.php" ); //include FPDF Library
		
      // Start of PDF Configuration-> arrays with configs(just values, instead u can use values hardcoding)
     $textColour = array( 0, 0, 0 );
     $headerColour = array( 100, 100, 100 );
	 $reportName = "Your Ticket";
     $reportNameYPos = 160;
     $logoFile = "../images/ticket.jpg";
     $logoXPos = 50;
     $logoYPos = 12;
     $logoWidth = 114;
     //$tableHeaderTopTextColour = array( 255, 255, 255 );
     //$tableHeaderTopFillColour = array( 125, 152, 179 );
     //$tableHeaderTopProductTextColour = array( 0, 0, 0 );
     //$tableHeaderTopProductFillColour = array( 143, 173, 204 );
     //$tableHeaderLeftTextColour = array( 99, 42, 57 );
     //$tableHeaderLeftFillColour = array( 184, 207, 229 );
     //$tableBorderColour = array( 50, 50, 50 );
     //$tableRowFillColour = array( 213, 170, 170 );
    
     //$columnLabels = array( "Q1", "Q2", "Q3", "Q4" );
     //$rowLabels = array( "SupaWidget", "WonderWidget", "MegaWidget", "HyperWidget" );
     //$chartXPos = 20;
     //$chartYPos = 250;
     //$chartWidth = 160;
     //$chartHeight = 80;
     //$chartXLabel = "Product";
     //$chartYLabel = "2009 Sales";
     //$chartYStep = 20000;

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
      $pdf = new FPDF  /*new tFPDF */( 'P', 'mm', 'A4' ); //adding cyrillic language support
      $pdf->SetTextColor( $textColour[0], $textColour[1], $textColour[2] );


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
/*
$pdf->SetTextColor( $textColour[0], $textColour[1], $textColour[2] );
$pdf->SetFont( 'Arial', '', 20 );
$pdf->Write( 19, "PDF Ticket" );
$pdf->Ln( 12 );  //blankspace line with height 12
*/

      //adding cyrillic language support!!!!!!
      //$pdf->AddFont('DejaVu','','DejaVuSansCondensed.ttf',true);
      //$pdf->SetFont('DejaVu','',14);


      //add Ticket User Name
      $pdf->Ln( 5 );
      $userX = "User: " . $_GET['serverName'];
      $pdf->Write( 6,  $userX  ); //6 is a height
      $pdf->Ln( 5 );

      //add Ticket Email
      $pdf->Ln( 5 );
      $emailX = "Email: " . $_GET['serverEmail'];
      $pdf->Write( 6,  $emailX  ); //6 is a height
      $pdf->Ln( 5 );

      //add Ticket Event name
      $pdf->Ln( 5 );
      $eventX = "Event: " . $this->decodeSpecialChars($_GET['serverEvent']); //decode , replace in Event any "_" to "&"
      $pdf->Write( 6,  $eventX  ); //6 is a height
      $pdf->Ln( 5 );

      //add Ticket Venue 
      $pdf->Ln( 5 );
      $pdf->SetFont( 'Arial', '', 12 );
      $venue = "Venue: " . $_GET['serverVenue'] ;
      $pdf->Write( 6,  $venue  ); //6 is a height
      $pdf->Ln( 5 );

      //add Ticket date normal
      $pdf->Ln( 5 );
      $dateX = "Date: " . $_GET['serverDateNormal'];
      $pdf->Write( 6,  $dateX  ); //6 is a height
      $pdf->Ln( 5 );

      //add Ticket start time
      $pdf->Ln( 5 );
      $startX = "Start: " . $_GET['serverStartTime'];
      $pdf->Write( 6,  $startX  ); 
      $pdf->Ln( 5 );

      //add Ticket seat place
      $pdf->Ln( 5 );
      $seatX = "Seat: " . $_GET['serverTicketPlace'];
      $pdf->Write( 6,  $seatX  ); 
      $pdf->Ln( 5 );

      //add Ticket price
      $pdf->Ln( 5 );
      $priceX = "Price: " . $_GET['serverPrice'] . " EURO";
      $pdf->Write( 6,  $priceX  ); 
      $pdf->Ln( 5 );

      //add Ticket UUID
      $pdf->Ln( 5 );
      $uuidX = "UUID: " . $_GET['serverUUID'];
      $pdf->Write( 6,  $uuidX  );
      $pdf->Ln( 5 ); 

      //adds QR code
      $pdf->Ln( 5 );
      $qrTextX = $_GET['serverUUID'];
      QRcode::png($qrTextX, 'qr/filename.png'); // creates QR img file using -> Library/PHP_QR_Library/phpqrcode/qrlib.php. Creates it in ajax_php/qr, every time this qr is rewritten
      $pdf->Image('qr/filename.png', 10, 6, 40); //adds qR to PDF (x, y, width)

      //

     //$pdf->Image($barCodeLink ,0,0,0,0,'PNG');
     //$pdf->Image(  'mm.jpg', $logoXPos, $logoYPos, $logoWidth );



      //name of pdf
      $filename = "ticket.pdf";

      //display/download 
      $pdfdoc = $pdf->Output( $filename, $pdfDisplayMode ); //I - display to screen, D -download, S - don't show to screen(used in mailing)

//
/*
header('Pragma: public');
header('Expires: 0');
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
header('Content-Type: application-download');
header('Content-Length: ' . filesize($filename));
header('Content-Transfer-Encoding: binary');
header('Content-Disposition: attachment; filename="' . basename($filename) . '"');

$handle = fopen($filename, 'rb');
fpassthru($handle);
fclose($handle);

unlink($filename);
*/
//
	
  }
  // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
   
   
   
   
   
   
   
   
   
  //Decode, replace in Event any "_" to "&"
  // **************************************************************************************
  // **************************************************************************************
  //                                                                                     **  
  public function decodeSpecialChars($charX) 
  {
      if (strpos($charX, '_') !== false) {  //if string contains "_"
          $a = explode("_", $charX); //split by "_"
		  $b = implode("&",$a);    //join by "&"
		  return $b;
      } else {
		  $b = $charX;  //without changes
		  return $b;
	  }
  }
   
   // **                                                                                  **
  // **************************************************************************************
  // **************************************************************************************
   







}

?>
