// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ShipmentTracker {
    struct Shipment {
        uint id;
        address supplier;
        string origin;
        string destination;
        string itemDetails;
        string status; // Created, InTransit, Delivered
        uint timestamp;
    }

    mapping(uint => Shipment) public shipments;
    uint public shipmentCount = 0;

    event ShipmentCreated(uint id, address supplier, string itemDetails);
    event ShipmentStatusUpdated(uint id, string status);

    function createShipment(string memory origin, string memory destination, string memory itemDetails) public {
        shipmentCount++;
        shipments[shipmentCount] = Shipment(shipmentCount, msg.sender, origin, destination, itemDetails, "Created", block.timestamp);
        emit ShipmentCreated(shipmentCount, msg.sender, itemDetails);
    }

    function updateShipmentStatus(uint id, string memory status) public {
        Shipment storage s = shipments[id];
        require(s.supplier == msg.sender, "Only supplier can update");
        s.status = status;
        emit ShipmentStatusUpdated(id, status);
    }

    function getShipment(uint id) public view returns (Shipment memory) {
        return shipments[id];
    }
}
