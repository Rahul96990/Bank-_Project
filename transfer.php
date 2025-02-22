<?php
include "./connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if (isset($_POST['sender_acc_num']) && isset($_POST['recevier_acc_num']) && isset($_POST['pin_num']) && isset($_POST['amount']) && isset($_POST['user_id'])) {
    $pin = $_POST['pin_num'];
    $sender_acc_num = $_POST['sender_acc_num'];
    $recevier_acc_num = $_POST['recevier_acc_num'];
    $amount = $_POST['amount'];
    $id = $_POST['user_id'];

    if($amount >= 100000){
        echo json_encode(["error" => 'Amount should be less than 100000']);
        exit();
    }
        
    $sql = "SELECT account_number FROM account WHERE account_number IN ('$sender_acc_num', '$recevier_acc_num')";
    $res = mysqli_query($conn, $sql);
    
    if (mysqli_num_rows($res) == 2) {
        $sql2 = "SELECT * FROM account WHERE account_number = '$sender_acc_num' AND balance_amount >= $amount";
        $sql3 = "SELECT * FROM account WHERE account_number = '$recevier_acc_num'";
        $res2 = mysqli_query($conn, $sql2);
        $res3 = mysqli_query($conn, $sql3);
        $row1 = mysqli_fetch_assoc($res2);
        $row2 = mysqli_fetch_assoc($res3);
        if ($row1) {
            if ($row1['pin'] === $pin) {
                if (mysqli_num_rows($res2) > 0) {
                    $sender_update_value = $row1["balance_amount"] - $amount;
                    $recevier_update_value = $row2["balance_amount"] + $amount;
                    $sql4 = "UPDATE account SET balance_amount = $sender_update_value WHERE account_number = $sender_acc_num";
                    $sql5 = "UPDATE account SET balance_amount = $recevier_update_value WHERE account_number = $recevier_acc_num ";
                    
                    $res4 = mysqli_query($conn, $sql4);
                    $res5 = mysqli_query($conn, $sql5);
    
                    echo json_encode(["message" => 'Transaction successful! Your payment has been processed.']);
                    $res6 = mysqli_query($conn, "INSERT INTO transaction(user_id,transaction_type,sender_account_number,receiver_account_number,amount,status) VALUES($id,'Transfer',$sender_acc_num ,$recevier_acc_num,$amount,'Successful')");
                    
                }
            }else{
                echo json_encode(["error" => 'Pin Not Match']);
                exit();
            }
        }else{
            echo json_encode(["error" => 'Insufficient balance. Please check your account balance and try again.']);
            $res6 = mysqli_query($conn, "INSERT INTO transaction(user_id,transaction_type,sender_account_number,receiver_account_number,amount,status) VALUES($id,'Transfer',$sender_acc_num ,$recevier_acc_num,$amount,'Failed')");
            exit();
        }
        
    } else {
        echo json_encode(["error" => 'One or both accounts do not exist']);
        exit();
    }

    // echo json_encode(["error" => $pin,$sender_acc_num,$recevier_acc_num,$amount]);
}else{
    echo json_encode(["error" => "Not found "]);
}

// if (isset($_POST['sender_acc_num']) && isset($_POST['recevier_acc_num']) && isset($_POST['pin_num']) && isset($_POST['amount'])) {
//     $pin = $_POST['pin_num'];
//     $sender_acc_num = $_POST['sender_acc_num'];
//     $recevier_acc_num = $_POST['recevier_acc_num'];
//     $amount = $_POST['amount'];

//     // Check if both accounts exist
//     $sql = "SELECT account_number, balance_amount, pin FROM account WHERE account_number IN ('$sender_acc_num', '$recevier_acc_num')";
//     $res = mysqli_query($conn, $sql);

//     if (mysqli_num_rows($res) == 2) {
//         $accounts = [];
//         while ($row = mysqli_fetch_assoc($res)) {
//             $accounts[$row['account_number']] = $row;
//         }

//         // Check sender's account details
//         if (isset($accounts[$sender_acc_num]) && isset($accounts[$recevier_acc_num])) {
//             $sender_account = $accounts[$sender_acc_num];
//             $receiver_account = $accounts[$recevier_acc_num];

//             // Verify PIN
//             if ($sender_account['pin'] === $pin) {
//                 // Check if sender has enough balance
//                 if ($sender_account['balance_amount'] >= $amount) {
//                     $sender_new_balance = $sender_account['balance_amount'] - $amount;
//                     $receiver_new_balance = $receiver_account['balance_amount'] + $amount;

//                     // Update balances
//                     $update_sender = "UPDATE account SET balance_amount = $sender_new_balance WHERE account_number = '$sender_acc_num'";
//                     $update_receiver = "UPDATE account SET balance_amount = $receiver_new_balance WHERE account_number = '$recevier_acc_num'";

//                     $update_sender_res = mysqli_query($conn, $update_sender);
//                     $update_receiver_res = mysqli_query($conn, $update_receiver);

//                     if ($update_sender_res && $update_receiver_res) {
//                         echo json_encode(["message" => 'Transaction successful! Your payment has been processed.']);
//                     } else {
//                         echo json_encode(["error" => 'Transaction failed. Please try again later.']);
//                     }
//                 } else {
//                     echo json_encode(["error" => 'Insufficient balance. Please check your account balance and try again.']);
//                 }
//             } else {
//                 echo json_encode(["error" => 'Incorrect PIN. Please try again.']);
//             }
//         } else {
//             echo json_encode(["error" => 'One or both accounts do not exist']);
//         }
//     } else {
//         echo json_encode(["error" => 'One or both accounts do not exist']);
//     }
// } else {
//     echo json_encode(["error" => 'Missing required fields']);
// }

?> 
