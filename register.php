<?php
include "./connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Function to check if required fields are empty
function checkEmptyFields($fields) {
    foreach ($fields as $field => $value) {
        if (empty(trim($value))) {
            echo json_encode(["message" => "$field is required"]);
            return false;
        }
    }
    return true;
}

// Collect POST data
$firstname = $_POST['firstname'] ?? '';
$middlename = $_POST['middlename'] ?? '';
$lastname = $_POST['lastname'] ?? '';
$password = $_POST['password'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$dateofbirth = $_POST['dob'] ?? '';
$address = $_POST['address'] ?? '';
$state = $_POST['state'] ?? '';
$city = $_POST['city'] ?? '';
$aadhaar = $_POST['aadhaar'] ?? '';
$gender = $_POST['gender'] ?? '';

// Check if all fields are empty
$requiredFields = [
    'firstname' => $firstname,
    'lastname' => $lastname,
    'password' => $password,
    'email' => $email,
    'phone' => $phone,
    'dob' => $dateofbirth,
    'address' => $address,
    'state' => $state,
    'city' => $city,
    'aadhaar' => $aadhaar,
    'gender' => $gender
];

if (checkEmptyFields($requiredFields)) {
    // Check if the user already exists in the database
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode(["message" => "User already exists!"]);
    } else {
        // Insert new user into the database
        $sql = "INSERT INTO users (first_name, middle_name, last_name, password, email, phone_number, date_of_birth, address, state, city, aadhaar_number, gender)
                VALUES ('$firstname', '$middlename', '$lastname', '$password', '$email', '$phone', '$dateofbirth', '$address', '$state', '$city', '$aadhaar', '$gender')";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "Registration successful!"]);
        } else {
            echo json_encode(["message" => "Error: " . $conn->error]);
        }
    }
} else {
    echo json_encode(["message" => "Some fields are empty"]);
}

$conn->close();
?>
