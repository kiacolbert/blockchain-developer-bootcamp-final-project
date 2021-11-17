import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Provenance from './artifacts/contracts/Provenance.sol/Provenance.json'

const ProvenanceAddress = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';

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
      debugger;
      const transaction = await contract.registerArtist(userAccount, userName);
      await transaction.wait();
    }
  }

  function handleChange(e) {
    debugger;
    setUserName(e.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount}>Connect to Metamask</button>
      <form onSubmit={registerArtist}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </header>
    </div>
  );
}

export default App;
