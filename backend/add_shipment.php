<?php
header("Content-Type: application/json");
include "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

$supplier_id = $data["supplier_id"] ?? "";
$warehouse_id = $data["warehouse_id"] ?? "";
$batch_id = $data["batch_id"] ?? "";
$status = $data["status"] ?? "Pending";
$integrity_score = $data["integrity_score"] ?? 100;

if (!$supplier_id || !$warehouse_id || !$batch_id) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO shipments (supplier_id, warehouse_id, batch_id, status, integrity_score) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("iissi", $supplier_id, $warehouse_id, $batch_id, $status, $integrity_score);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Shipment created successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to create shipment"]);
}
?>
