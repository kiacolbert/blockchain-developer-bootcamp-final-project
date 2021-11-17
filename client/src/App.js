import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Provenance from './artifacts/contracts/Provenance.sol/Provenance.json'

const ProvenanceAddress = '0x610178dA211FEF7D417bC0e6FeD39F05609AD788';

function App() {
  const [userAccount, setUserAccount] = useState();
  const [userName, setUserName] = useState();

  async function requestAccount() {
   const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
   setUserAccount(account);
  }

  async function registerArtist(e) {
    e.preventDefault();
    if (typeof window.ethereum !== 'undefined' && userAccount) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ProvenanceAddress, Provenance.abi, signer);
      const transaction = await contract.registerArtist(userName, userAccount);
      await transaction.wait();
      const artists = await contract.getArtist();
      console.log(artists);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount}>Connect to Metamask</button>
      <form onSubmit={registerArtist}>
        <label>
          <input type="text" name="name" onChange={e => setUserName(e.target.value)} placeholder="Enter Name"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </header>
    </div>
  );
}

export default App;
