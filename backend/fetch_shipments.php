<?php
header("Content-Type: application/json");
include "db_connect.php";

$result = $conn->query("SELECT * FROM shipments ORDER BY id DESC");
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode(["status" => "success", "shipments" => $data]);
?>
