//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "hardhat/console.sol";
import "./OriginalArtwork.sol";


contract Provenance {
    // state variables
    address[] private artists;
    address[] private owners;
    uint256[] private artworks;

    struct History { 
        address owner;
        uint256 date;
    }
    mapping (address => string) public addressToArtistName;
    mapping (address => uint256) public artistToArtwork;
    mapping (uint256 => History[]) public artworkToHistory;

    constructor() {
        console.log("Deploying a Provenance ");
    }

    function registerArtist(address artist) public {
        require(artist != address(0), "Artist can not have 0 address");
        require(keccak256(abi.encode(addressToArtistName[artist])) == keccak256(""), "Artist is already registered");
        artists.push(artist);
    }

    function registerArtwork(address artist, string memory artURI) 
        public 
        returns (uint256 artId) 
    {
        // and check that artwork is not registered
        require(keccak256(abi.encode(addressToArtistName[artist])) != keccak256(""), "Artist is not registered");
        OriginalArtwork oa = new OriginalArtwork();
        artId = oa.createOriginalArtwork(artist, artURI);
        artworks.push(artId);
        // History history = new History({ owner: artist})
        // artistToArtwork  // add artwork to artist.
        return artId;
    }

    function getArtworkHistory(uint256 artHash) public view returns (History[] memory) {
        return artworkToHistory[artHash];
    }

    function transferOwnership(address previousOwner, address newOwner) public {

    }
}
