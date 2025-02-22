<?php
include "./connection.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

$transactions = [
    ["id" => 1, "amount" => 500, "date" => "2024-02-01"],
    ["id" => 2, "amount" => 12100, "date" => "2024-02-02"],
    ["id" => 3, "amount" => 7200, "date" => "2024-02-03"],
    ["id" => 4, "amount" => 1300, "date" => "2024-02-04"],
    ["id" => 5, "amount" => 12500, "date" => "2024-02-05"]
];

echo json_encode($transactions);
?>
