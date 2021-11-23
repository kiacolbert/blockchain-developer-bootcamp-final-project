# Provenance

Decentralized provenance verification for physical art.

Artist register their artwork on the ethereum block chain and are the original owners.  When they sell their art, ownership is transferred and they receive royalties(TODO). Buyers never have to wonder about the authenticity of the work.

Hosted at: https://pensive-tesla-2256e2.netlify.app

**Directory Structure**

Frontend is a React app located under the `/client` . Hardhat is the ethereum development environment and is located under `/tools`. 
```
project
|___client/
|   |____package.json
|   |____src/
|        |____artifacts/ // contract builds
|        |____App.js
|___tools/
|   |____contracts/
|   |____test/
|   |____hardhat.config.js
|   |____sample.env
|   |____package.json
```

**Workflow**
1. Artist registers to contract.
2. Artwork image is uploaded to a distributed file store and a hash created.
3. Artist registers the hash to the contract as original work.
4. Artist sells artwork and transfers ownership.
5. No more questions of, "is this legit?"


## To Run
### Dependencies
- node.js
- MetaMask Chrome extension
- npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers
- npm install in `/tools`
- yarn install in `/client`

### Running Locally
- Frontend: `yarn start` in `/client`
- Uncomment hardhat network in [hardhat.config.js](https://github.com/kiacolbert/blockchain-developer-bootcamp-final-project/blob/3ca68db75aef1dc3f0f6bda364400b73ebe9d066/tools/hardhat.config.js#L25-L27)
- Deploy contracts: `npx hardhat run scripts/deploy.js --network localhost`
- Update Provenance contract address in [App.js](https://github.com/kiacolbert/blockchain-developer-bootcamp-final-project/blob/3ca68db75aef1dc3f0f6bda364400b73ebe9d066/client/src/App.js#L6)
- Start local network: `npx hardhat node`
- Import test address into metamask

### Running on Test network
- Add desired network in `hardhat.config.js` under `module.exports`.
- Copy `sample.env` and rename to `.env`. Add private key to `ACCOUNTS`.

### Testing
In `tools/` run `npx hardhat test`

