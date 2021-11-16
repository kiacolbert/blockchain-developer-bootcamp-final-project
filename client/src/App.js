import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
// import Provenance from './artifacts/contracts/Provenance.sol/Provenance.json'

const ProvenanceAddress = '';

function App() {
  const [userAccount, setUserAccount] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function registerArtist() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // const contract = new ethers.Contract(ProvenanceAddress, Provenance.abi, signer);
      // const transation = await contract.transfer(userAccount, amount);
      // await transation.wait();
      // console.log(`${amount} successfully registered to ${userAccount}`);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" onSubmit={registerArtist}/>
      </form>
      </header>
    </div>
  );
}

export default App;
