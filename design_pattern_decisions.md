**Design Pattern Decisions**

- **Inter-Contract Execution** - Calling functions in external contracts.  The `Provenance.sol` contract calls function located in the `OriginalArtwork.sol` contract.

- **Inheritance and Interfaces** - Importing and extending contracts and using contract interfaces. The contract `OriginalArtwork.sol` imports the OpenZepppelin contract `ERC721URIStorage`.