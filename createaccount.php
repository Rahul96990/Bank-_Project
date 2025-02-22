<?php
include "./connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

function generateAccountNumber($conn)
{
     do {
          $account_number = rand(1000000000, 9999999999);
          $res = mysqli_query($conn, "SELECT account_number FROM account WHERE account_number = '$account_number'");
     } while (mysqli_num_rows($res) > 0);

     return $account_number;
}

function generatePinNumber($conn)
{
     do {
          $pin = rand(10000, 100000);
          $res = mysqli_query($conn, "SELECT pin FROM account WHERE pin = '$pin'");
     } while (mysqli_num_rows($res) > 0);

     return $pin;
}



if(isset($_POST['account_number']) && isset($_POST['user_id'])){
     $id = $_POST['user_id'];
     $fullname = $_POST['fullname'];
     $account_number = $_POST['account_number'];
     $account_type = $_POST['account_type'];
     $balance_amount = $_POST['balance_amount'];
     $annual_income = $_POST['annual_income'];
     $occupation = $_POST['occupation'];
     $pan_card = $_POST['pan_num'];
     $location = $_POST['branch_location'];
     $phone = $_POST['phone_number'];
     $pin = $_POST['pin_num'];
     
     $sql1 = mysqli_query($conn,"SELECT * from account where account_number = $account_number");
     if (mysqli_num_rows($sql1) == 0) {
          $sql2 = mysqli_query($conn,"INSERT INTO account(user_id,name,account_number,account_type,balance_amount,annual_income,occupation,account_creation_date,pan_card,branch_location,pin,phone_number) VALUES ('$id','$fullname','$account_number','$account_type',$balance_amount,$annual_income,'$occupation',NOW(),'$pan_card','$location','$pin',$phone)");
          if ($sql2) {
               echo json_encode(["message" => "Account Created Successfully"]);
          }
          
     }
}else if (isset($_POST['user_id'])) {
     $id = $_POST['user_id'];
     $sql = "SELECT * FROM users WHERE user_id=$id";
     $user = mysqli_query($conn, $sql);
     $acc_num = generateAccountNumber($conn);
     $pin_num = generatePinNumber($conn);
     if (mysqli_num_rows($user) > 0) {
          $user_data = mysqli_fetch_assoc($user);
          echo json_encode([
               "acc_num" => $acc_num,
               "pin_num" => $pin_num,
               "first_name" => $user_data['first_name'],
               "middle_name" => $user_data['middle_name'],
               "last_name" => $user_data['last_name'],
               "password" => $user_data['password'],
               "email" => $user_data['email'],
               "phone_number" => $user_data['phone_number'],
               "dob" => $user_data['date_of_birth'],
               "address" => $user_data['address'],
               "state" => $user_data['state'],
               "city" => $user_data['city'],
               "aadhaar_number" => $user_data['aadhaar_number'],
               "gender" => $user_data['gender'],
          ]);
     }
}
