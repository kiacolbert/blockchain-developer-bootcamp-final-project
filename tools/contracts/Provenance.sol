//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "hardhat/console.sol";
import "./OriginalArtwork.sol";


contract Provenance {
    // state variables
    string[] private artistNames;
    address[] private owners;
    uint256[] private artworks;

    struct Artist {
        address artistAddress;
        string name;
        uint256[] artworks;
        bool exists;
    }

    struct History { 
        address owner;
        uint256 date;
    }

    mapping (address => Artist) public registeredArtists;
    mapping (uint256 => History[]) public artworkToHistory;

    constructor() {
        console.log("Deploying Provenance");
    }

    function registerArtist(string memory _name) public {
        require(msg.sender != address(0), "Artist can not have 0 address");
        if (registeredArtists[msg.sender].exists) {
            revert("Artist is already registered");
        }
        uint256[] memory arr;
        Artist memory artist = Artist({ artistAddress: msg.sender, name: _name, artworks: arr, exists: true });
        registeredArtists[msg.sender] = artist;
        artistNames.push(_name);
    }

    function getArtist() public view returns (string[] memory) {
        return artistNames;
    }

    function registerArtwork(string memory artURI) 
        public 
        returns (uint256 artId) 
    {
        require(registeredArtists[msg.sender].exists, "Artist must be registered");

        OriginalArtwork oa = new OriginalArtwork();
        artId = oa.createOriginalArtwork(msg.sender, artURI);
        registeredArtists[msg.sender].artworks.push(artId);
        artworks.push(artId);
        // History history = History({ owner: artist})
        // artistToArtwork  // add artwork to artist.
        return artId;
    }

    function getArtwork() public view returns (uint256[] memory)  {
        return artworks;
    }

    function getArtworkHistory(uint256 artHash) public view returns (History[] memory) {
        return artworkToHistory[artHash];
    }

    function transferOwnership(address previousOwner, address newOwner) public {

    }
}
