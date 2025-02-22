<?php
include "./connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');


if (isset($_POST['user_id']) && isset($_POST['signal'])) {
    $id = $_POST['user_id'];
    $sql = "SELECT transaction_type,transaction_date,status, SUM(amount) AS total_amount 
            FROM transaction 
            WHERE user_id = $id
            GROUP BY transaction_date 
            ORDER BY transaction_date DESC";
    $result = mysqli_query($conn,$sql);
    $transaction = array();
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)){
            $transaction[] = array(
                'amount' => $row['total_amount'],
                'transaction_date' => $row['transaction_date'],            
                'transaction_type' => $row['transaction_type'],
                'status' => $row['status'],              
            );
        }
        echo json_encode($transaction);
    }

    exit();
}

if (isset($_POST['user_id'])) {
    $id = $_POST['user_id'];
    $sql = "SELECT * FROM transaction WHERE user_id=$id ORDER BY transaction_date DESC";
    $result = mysqli_query($conn,$sql);
    $transaction = array();
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)){
            $transaction[] = array(
                'transaction_id' => $row['transaction_id'],
                'transaction_type' => $row['transaction_type'],
                'sender_account_number' => empty($row['sender_account_number']) ? '-' : $row['sender_account_number'],
                'receiver_account_number' => empty($row['receiver_account_number']) ? '-' : $row['receiver_account_number'],
                'account_number' => empty($row['account_number']) ? '-' : $row['account_number'],
                'amount' => $row['amount'],
                'transaction_date' => $row['transaction_date'],
                'status' => $row['status']                
            );
        }
        echo json_encode($transaction);
    }
    exit();
}


?>
