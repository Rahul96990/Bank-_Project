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

          $res1 = mysqli_query($conn, "SELECT * FROM account WHERE account_number = '$acc_num'");

          if ($res1) {
                    $row1 = mysqli_fetch_assoc($res1);
                    if ($row1['pin'] == $pin_num) {
                              $new_bal = $row1['balance_amount'] + $amount;
                              $res2 = mysqli_query($conn, "UPDATE account SET balance_amount = $new_bal WHERE account_number = $acc_num");
                              echo json_encode(["message" => 'Deposite Successful!']);
                              $res3 = mysqli_query($conn, "INSERT INTO transaction(user_id,transaction_type,account_number,amount,status) VALUES($id,'Deposite',$acc_num,$amount,'Successful')");
                              exit();
                    } else {
                              echo json_encode(["error" => 'Pin Not Match']);
                              exit();
                    }
          }
} else {
          echo json_encode(["error" => "Not found "]);
}
