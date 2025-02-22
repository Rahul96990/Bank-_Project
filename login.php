<?php
include "./connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if (isset($_POST['fullname'], $_POST['email'], $_POST['password'])) {
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Query to check if the user exists in the database
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if ($user['password'] === $password) {
            echo json_encode([
                "message" => "Login_Successful!",
                "user_id" => $user['user_id'],
            ]);
        } else {
            echo json_encode(["message" => "Invalid Data!"]);
        }
    } else {
        echo json_encode(["message" => "User not found!"]);
    }
}
if (isset($_POST['user_id'])){
    $id = $_POST['user_id'];
    $sql = "SELECT * FROM users WHERE user_id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
            echo json_encode([
                "first_name" => $user['first_name'],
                "middle_name" => $user['middle_name'],
                "last_name" => $user['last_name'],
                "password" => $user['password'],
                "email" => $user['email'],
                "phone_number" => $user['phone_number'],
                "dob" => $user['date_of_birth'],
                "address" => $user['address'],
                "state" => $user['state'],
                "city" => $user['city'],
                "aadhaar_number" => $user['aadhaar_number'],
                "gender" => $user['gender'],
                ]);
    }
}

?>
