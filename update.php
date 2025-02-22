<?php
include "./connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$values = array("firstname","user_id", "middlename", "lastname", "password", "email", "phone", "dob", "address", "state", "city", "aadhaar", "gender");
$conform = True;
foreach ($values as $value) {
    if (isset($_POST[$value])) {
        $conform = False;
    }
}

if (isset($conform)) {
    $user_id = $_POST["user_id"];
    $firstname = $_POST["firstname"];
    $middlename = $_POST["middlename"];
    $lastname = $_POST["lastname"];
    $password = $_POST["password"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $dob = $_POST["dob"];
    $address = $_POST["address"];
    $state = $_POST["state"];
    $city = $_POST["city"];
    $aadhaar = $_POST["aadhaar"];
    $gender = $_POST["gender"];

    $sql = mysqli_query($conn,"UPDATE users SET first_name='$firstname', middle_name='$middlename', last_name='$lastname', password='$password', email='$email', phone_number='$phone', date_of_birth='$dob', address='$address', state='$state', city='$city', aadhaar_number='$aadhaar', gender='$gender' WHERE user_id = '$user_id'");
    if ($sql) {
        echo json_encode(["message" => "Profile updated successfully!"]);
    }

}

$conn->close();
