<?php
include "./connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if (isset($_POST['user_id'])) {
    $id = $_POST['user_id'];
    $sql = "SELECT * FROM account WHERE user_id=$id";
    $result = mysqli_query($conn,$sql);
    $transaction = array();
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)){
            $transaction[] = array(
                'account_number' => $row['account_number'],
                'account_type' => $row['account_type'],
                'balance_amount' => $row['balance_amount'],
                'annual_income' => $row['annual_income'],
                'account_creation_date' => $row['account_creation_date'],
                'pan_card' => $row['pan_card'],
                'name' => $row['name'],
                'branch_location' => $row['branch_location'],
                'pin' => $row['pin'],
                'phone_number' => $row['phone_number']            
            );
        }
        echo json_encode($transaction);
    }
}


?>
