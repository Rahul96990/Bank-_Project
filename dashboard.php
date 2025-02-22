<?php
include "./connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if (isset($_POST['user_id']) && isset($_POST['signal'])) {
          $id = $_POST['user_id'];

          $sql1 = mysqli_query($conn, "SELECT Count(*) As total_amounts FROM account WHERE user_id = $id");
          $row1 = mysqli_fetch_assoc($sql1);

          $sql2 = mysqli_query($conn, "SELECT Count(*) As total_saving_accounts FROM account WHERE user_id = $id and account_type = 'Saving'");
          $row2 = mysqli_fetch_assoc($sql2);

          $sql3 = mysqli_query($conn, "SELECT Count(*) As total_current_accounts FROM account WHERE user_id = $id and account_type = 'Current'");
          $row3 = mysqli_fetch_assoc($sql3);
          
          $sql4 = mysqli_query($conn, "SELECT Sum(balance_amount) As total_balance FROM account WHERE user_id = $id");
          $row4 = mysqli_fetch_assoc($sql4);
          
          $sql5 = mysqli_query($conn, "SELECT Sum(balance_amount) As total_saving_balance FROM account WHERE user_id = $id and account_type = 'Saving'");
          $row5 = mysqli_fetch_assoc($sql5);
          
          $sql6 = mysqli_query($conn, "SELECT Sum(balance_amount) As total_current_balance FROM account WHERE user_id = $id and account_type = 'Current'");
          $row6 = mysqli_fetch_assoc($sql6);
          
          if ($sql1 && $sql2 && $sql3 && $sql4 && $sql5 && $sql6) {
                    echo json_encode([
                              "total_amounts" => $row1['total_amounts'],
                              "total_saving_accounts" => $row2['total_saving_accounts'],
                              "total_current_accounts" => $row3['total_current_accounts'],
                              "total_current_balance" => $row6['total_current_balance'],
                              "total_saving_balance" => $row5['total_saving_balance'],
                              "total_balance" => $row4['total_balance'],
                    ]);
                    exit();      
          }

          
}

// 100538599.99     total amount balance
// 409000.00         Saving account balance
// 100129599.99     Current account balance

// 99999999.99 , 409000.00, 119600.00,10000.00

// if (isset($_POST['sender_acc_num']) && isset($_POST['recevier_acc_num']) && isset($_POST['pin_num']) && isset($_POST['amount']) && isset($_POST['user_id'])) {
//     $pin = $_POST['pin_num'];
//     $sender_acc_num = $_POST['sender_acc_num'];
//     $recevier_acc_num = $_POST['recevier_acc_num'];
//     $amount = $_POST['amount'];
//     $id = $_POST['user_id'];

//     if($amount >= 100000){
//         echo json_encode(["error" => 'Amount should be less than 100000']);
//         exit();
//     }
        
//     $sql = "SELECT account_number FROM account WHERE account_number IN ('$sender_acc_num', '$recevier_acc_num')";
//     $res = mysqli_query($conn, $sql);
    
//     if (mysqli_num_rows($res) == 2) {
//         $sql2 = "SELECT * FROM account WHERE account_number = '$sender_acc_num' AND balance_amount >= $amount";
//         $sql3 = "SELECT * FROM account WHERE account_number = '$recevier_acc_num'";
//         $res2 = mysqli_query($conn, $sql2);
//         $res3 = mysqli_query($conn, $sql3);
//         $row1 = mysqli_fetch_assoc($res2);
//         $row2 = mysqli_fetch_assoc($res3);
//         if ($row1) {
//             if ($row1['pin'] === $pin) {
//                 if (mysqli_num_rows($res2) > 0) {
//                     $sender_update_value = $row1["balance_amount"] - $amount;
//                     $recevier_update_value = $row2["balance_amount"] + $amount;
//                     $sql4 = "UPDATE account SET balance_amount = $sender_update_value WHERE account_number = $sender_acc_num";
//                     $sql5 = "UPDATE account SET balance_amount = $recevier_update_value WHERE account_number = $recevier_acc_num ";
                    
//                     $res4 = mysqli_query($conn, $sql4);
//                     $res5 = mysqli_query($conn, $sql5);
    
//                     echo json_encode(["message" => 'Transaction successful! Your payment has been processed.']);
//                     $res6 = mysqli_query($conn, "INSERT INTO transaction(user_id,transaction_type,sender_account_number,receiver_account_number,amount,status) VALUES($id,'Transfer',$sender_acc_num ,$recevier_acc_num,$amount,'Successful')");
                    
//                 }
//             }else{
//                 echo json_encode(["error" => 'Pin Not Match']);
//                 exit();
//             }
//         }else{
//             echo json_encode(["error" => 'Insufficient balance. Please check your account balance and try again.']);
//             $res6 = mysqli_query($conn, "INSERT INTO transaction(user_id,transaction_type,sender_account_number,receiver_account_number,amount,status) VALUES($id,'Transfer',$sender_acc_num ,$recevier_acc_num,$amount,'Failed')");
//             exit();
//         }
        
//     } else {
//         echo json_encode(["error" => 'One or both accounts do not exist']);
//         exit();
//     }

//     // echo json_encode(["error" => $pin,$sender_acc_num,$recevier_acc_num,$amount]);
// }else{
//     echo json_encode(["error" => "Not found "]);
// }


?> 
