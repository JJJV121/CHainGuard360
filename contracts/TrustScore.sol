// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TrustScore {
    mapping(address => uint) public trustScores;

    event ScoreUpdated(address supplier, uint newScore);

    function updateTrustScore(address supplier, uint performanceMetric) public {
        uint currentScore = trustScores[supplier];
        uint newScore = currentScore + performanceMetric;
        if (newScore > 100) newScore = 100;
        trustScores[supplier] = newScore;
        emit ScoreUpdated(supplier, newScore);
    }

    function getTrustScore(address supplier) public view returns (uint) {
        return trustScores[supplier];
    }
}
