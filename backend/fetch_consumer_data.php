<?php
header("Content-Type: application/json");
include "db_connect.php";

$result = $conn->query("SELECT id, batch_id, integrity_score, status FROM shipments WHERE status='Delivered'");
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode(["status" => "success", "consumer_data" => $data]);
?>
