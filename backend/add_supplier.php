<?php
header("Content-Type: application/json");
include "db_connect.php";

$data = json_decode(file_get_contents("php://input"), true);
$name = $data["name"] ?? "";
$location = $data["location"] ?? "";
$trust_score = $data["trust_score"] ?? 100;

if (!$name || !$location) {
    echo json_encode(["status" => "error", "message" => "Name and location required"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO suppliers (name, location, trust_score) VALUES (?, ?, ?)");
$stmt->bind_param("ssi", $name, $location, $trust_score);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Supplier added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to add supplier"]);
}
?>
