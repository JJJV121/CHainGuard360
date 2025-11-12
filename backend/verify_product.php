<?php
header("Content-Type: application/json");
include "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);
$batch_id = $data["batch_id"] ?? "";

if (!$batch_id) {
    echo json_encode(["status" => "error", "message" => "Batch ID required"]);
    exit;
}

$stmt = $conn->prepare("SELECT s.batch_id, sp.name AS supplier, w.name AS warehouse, s.integrity_score, s.status 
                        FROM shipments s
                        JOIN suppliers sp ON s.supplier_id = sp.id
                        JOIN warehouse w ON s.warehouse_id = w.id
                        WHERE s.batch_id=?");
$stmt->bind_param("s", $batch_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode(["status" => "success", "verified" => true, "product" => $row]);
} else {
    echo json_encode(["status" => "error", "verified" => false, "message" => "Product not found"]);
}
?>
