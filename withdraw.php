<?php
include "./connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if (isset($_POST['acc_num']) && isset($_POST['pin_num']) && isset($_POST['amount']) && isset($_POST['user_id'])) {
    $pin_num = $_POST['pin_num'];
    $acc_num = $_POST['acc_num'];
    $amount = $_POST['amount'];
    $id = $_POST['user_id'];

    $res1 = mysqli_query($conn,"SELECT * FROM account WHERE account_number = '$acc_num'");
    
    if($res1){
          $row1 = mysqli_fetch_assoc($res1);
          if($row1['pin'] == $pin_num){
                    if ($row1['balance_amount'] >= $amount) {
                              $new_bal = $row1['balance_amount'] - $amount;
                              $res2 = mysqli_query($conn,"UPDATE account SET balance_amount = $new_bal WHERE account_number = $acc_num");
                              echo json_encode(["message" => 'Withdraw Successful!']);
                              $res3 = mysqli_query($conn, "INSERT INTO transaction(user_id,transaction_type,account_number,amount,status) VALUES($id,'Withdraw',$acc_num,$amount,'Successful')");
                              exit();
                    } else {
                              echo json_encode(["error" => 'You not have balance']);
                              $res3 = mysqli_query($conn, "INSERT INTO transaction(user_id,transaction_type,account_number,amount,status) VALUES($id,'Withdraw',$acc_num,$amount,'Failed')");
                              exit();
                    }
                    
          }else{
                    echo json_encode(["error" => 'Pin Not Match']);
                    exit();
          }
    }




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

}else{
    echo json_encode(["error" => "Not found "]);
}

?>
