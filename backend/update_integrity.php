<?php
header("Content-Type: application/json");
include "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);

$batch_id = $data["batch_id"] ?? "";
$new_score = $data["integrity_score"] ?? 100;

if (!$batch_id) {
    echo json_encode(["status" => "error", "message" => "Batch ID required"]);
    exit;
}

$stmt = $conn->prepare("UPDATE shipments SET integrity_score=? WHERE batch_id=?");
$stmt->bind_param("is", $new_score, $batch_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Integrity score updated"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update integrity"]);
}
?>
