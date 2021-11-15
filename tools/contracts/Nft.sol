// contracts/OriginalArtwork.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "tools/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "tools/node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract OriginalArtwork is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("OriginalArtwork", "OAW") {}

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