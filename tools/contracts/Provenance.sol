//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "hardhat/console.sol";
import "tools/contracts/Nft.sol";


contract Provenance {
    // state variables
    address[] private artists;
    address[] private owners;
    bytes32[] private artworks;

    struct History { 
        address owner;
        uint256 date;
    }

    mapping (string => bytes32) public artistToArtwork;
    mapping (bytes32 => History[]) public artworkToHistory;

    constructor() {
        console.log("Deploying a Provenance ");
    }

    function registerArtist(address artist) public view {
        require(artist != address(0), "Artist can not have 0 address");
        artists.add(artist);
    }

    function registerArtwork(address artist, string memory artURI) public returns (uint256 artId){
        // and check that artowek is not registered
        require(artists[artist], "Artist is not registered");
        uint256 artId = createOriginalArtwork(artist, artURI);
        artworks.add(artId);
        // History history = new History({ owner: artist})
        // artistToArtwork  // add artwork to artist.
        return artId;
    }

    function getArtworkHistory(bytes32 artHash) public view returns (History[] memory) {
        return artworkToHistory[artHash];
    }

    function transferOwnership(address previousOwner, address newOwner) public {

    }
}
