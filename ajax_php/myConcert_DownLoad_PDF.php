<?php
include '../Classes/autoload.php';//uses autoload instead of manual includin each class->

$pdf = new Create_PDF_with_QR();
$arg = "D";
$pdf->create_pdf_qr($arg); //pdfDisplayMode can be: I - display to screen, D -download, S - don't show to screen(used in mailing)
 

 
 
 
 
	
	
	
	
	
	
?>