<?php 

$conn = new mysqli('localhost','root','','bank');

if ($conn->connect_error) {
    echo "Not Successfull Connection";
}



// Your database interaction code here



// Close connection

// $conn->close();



?>
