// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplierRegistry {
    struct Supplier {
        string name;
        string location;
        string certificateHash; // IPFS hash of uploaded certification
        bool verified;
    }

    mapping(address => Supplier) public suppliers;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not authorized");
        _;
    }

    function registerSupplier(address supplierAddr, string memory name, string memory location, string memory certHash) public onlyAdmin {
        suppliers[supplierAddr] = Supplier(name, location, certHash, false);
    }

    function verifySupplier(address supplierAddr) public onlyAdmin {
        suppliers[supplierAddr].verified = true;
    }

    function getSupplier(address supplierAddr) public view returns (string memory, string memory, string memory, bool) {
        Supplier memory s = suppliers[supplierAddr];
        return (s.name, s.location, s.certificateHash, s.verified);
    }
}
