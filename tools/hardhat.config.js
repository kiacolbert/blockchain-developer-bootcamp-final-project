require('dotenv').config()
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  paths: {
    artifacts: '../client/src/artifacts',
  },
  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/2db8feac74b6494089e9e4b4e10d1204",
      accounts: [process.env.ACCOUNTS]
    }
    // uncomment for local development
    // hardhat: {
    //   chainId: 1337
    // }
  }
};