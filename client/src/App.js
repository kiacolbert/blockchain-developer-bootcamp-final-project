import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Provenance from './artifacts/contracts/Provenance.sol/Provenance.json'

const ProvenanceAddress = '0x68B1D87F95878fE05B998F19b66F4baba5De1aed';

function App() {
  const [userAccount, setUserAccount] = useState();
  const [userName, setUserName] = useState();
  const [artists, setArtists] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

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
      try {
        const transaction = await contract.registerArtist(userName, userAccount);
        await transaction.wait();
        const res = await contract.getArtist();
        setArtists(res); //TODO: artist is missing last index
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(error.message)
      }
    }
  }

  function Table () {
    return (
    <table>
      <thead>
        <tr>
          <th>Registered Artists</th>
        </tr>
      </thead>
      <tbody>
        <Row />
      </tbody>
      </table>);
  }

  function Row () {
    return artists.map(artist => {
      return(
      <tr>
       <td>{artist}</td>
      </tr>
     ) 
    });
  }

  function Error () {
    return <p>{errorMessage}</p>
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
      {!errorMessage && <Table />}
      {errorMessage && <Error />}
      </header>
    </div>
  );
}

export default App;
