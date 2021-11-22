const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Provenance", async () => {
  let provenance;
  
  beforeEach(async () => {
    const Provenance = await ethers.getContractFactory("Provenance");
    provenance = await Provenance.deploy();
    await provenance.deployed();
  });

  describe("getArtist", () => {
    it("Should return an array of all artist", async () => {
      const artists = await provenance.getArtist();
      expect(artists).to.be.a('array');
      expect(artists).to.have.length(0);

      // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

      // // wait until the transaction is mined
      // await setGreetingTx.wait();

      // expect(await greeter.greet()).to.equal("Hola, mundo!");
    });

    describe("registerArtist", () => {
      it("Should register artist", async () => {
        const name = "Basquiat";

        await provenance.registerArtist(name);

        const registered = await provenance.getArtist();
        expect(registered).to.have.length(1);
        expect(registered.name, name);
      });

      it("Should not register artist more than once and revert", async () => {
        const name = "Basquiat";
        await provenance.registerArtist(name);
        const registered = await provenance.getArtist();
        expect(registered).to.have.length(1);
        expect(registered.name, name);

        await expect(provenance.registerArtist(name))
          .to.be.revertedWith("Artist is already registered");
      });
    });
  });

    describe("getArtwork", () => {
      it("Should return array of all art", async () => {
        const artworks = await provenance.getArtwork();
        expect(artworks).to.be.a('array');
        expect(artworks).to.have.length(0);
      });
    });

    describe("registerArtwork", () => {
      it("Should revert when artist is not registered", async () => {
        await expect(provenance.registerArtwork('www.real.com'))
          .to.be.revertedWith("Artist must be registered");
      });
      it("Should register artwork to registered artist", async () => {
        await provenance.registerArtist('Basquiat');
        const id = await provenance.registerArtwork('www.real.com');
        expect(id).to.not.be.undefined;
      });
    });
});
