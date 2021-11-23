// contracts/OriginalArtwork.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title Artwork registered by artist
/// @author Kia Colbert
contract OriginalArtwork is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("OriginalArtwork", "OAW") {}

    /// @notice mints token and stores metadata uri
    function createOriginalArtwork(address artist, string memory artURI)
        public
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newOriginalArtwork = _tokenIds.current();
        _mint(artist, newOriginalArtwork);
        _setTokenURI(newOriginalArtwork, artURI);

        return newOriginalArtwork;
    }
}