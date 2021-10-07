//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "hardhat/console.sol";


contract Provenance {
    // state variables
    address[] private artists;
    address[] private owners;
    bytes32[] private artwork;

    struct History { 
        address owner;
        uint256 date;
        uint256 transactionId;
    }

    mapping (string => bytes32) public artistToArtwork;
    mapping (bytes32 => History[]) public artworkToHistory;

    constructor() {
        console.log("Deploying a Provenance ");
    }

    function registerArtist(address artist) public view {

    }

    function setArtwork(bytes32 artHash) public {

    }

    function getArtworkHistory(bytes32 artHash) public view returns (History[] memory) {
        return artworkToHistory[artHash];
    }

    function transferOwnership(address previousOwner, address newOwner) public {

    }
}
