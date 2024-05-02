import React, { useState } from "react";
import Web3 from "web3";
import "./Component/css/connect.css";
import TokenAbi from "./Component/abi/Token.json";
import NFTAbi from "./Component/abi/NFT.json";

const App = () => {
  const Tokenaddress = "0x46016B235f64534F3c2a0a31F069880578279cC5";
  const Nftaddress = "0xCa522dAf928beAE9f127a0A65cCEaeC47D73377f";
  const [sidesl, setsidesl] = useState("Token");
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [TokenContract, setTokenContract] = useState();
  const [NftContract, setNftContract] = useState();
  const [NFT_m, setNFT_m] = useState({
    name: "",
    description: "",
    image: "",
  });

  const initializeWeb3 = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      await updateContract(Tokenaddress, TokenAbi, setTokenContract, web3);
      await updateContract(Nftaddress, NFTAbi, setNftContract, web3);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } else {
      alert("Please install MetaMask");
    }
  };

  const updateContract = async (contractAddress, abi, setstate, web3) => {
    const readcontract = new web3.eth.Contract(abi, contractAddress);
    setstate(readcontract);
  };

  const handleInput = (e, State, setState) => {
    setState({ ...State, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {!account ? (
        <div className="container">
          <button className="connect-button" onClick={initializeWeb3}>
            Connect to Metamask
          </button>
        </div>
      ) : (
        <>
          <nav className="navbar">
            <div className="address-container">
              <span>Account: {account}</span>
            </div>
            <div>
              <button className="refresh-button" onClick={initializeWeb3}>
                Refresh
              </button>
            </div>
          </nav>
          <div className="container-sidebar">
            <Sidebar setsidesl={setsidesl} />
            <NftMint NFT_m={NFT_m} setNFT_m={setNFT_m} handleInput={handleInput} />
          </div>
        </>
      )}
    </div>
  );
};

const Sidebar = ({ setsidesl }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setsidesl("Token")}>Mint Nft</li>
        <li onClick={() => setsidesl("Buy")}>Mint Collection</li>
        <li onClick={() => setsidesl("Sell")}>Nft's</li>
        <li onClick={() => setsidesl("Swap")}>Collection's</li>
      </ul>
    </div>
  );
};

const NftMint = ({ NFT_m, setNFT_m, handleInput }) => {
  return (
    <div className="Nft_mint">
      <div className="form_container">
      <div className="Section_head">
        <h1>NFT Mint</h1>
      </div>
      <div className="token_row">
        <input
          className="input_field"
          type="text"
          placeholder="Name"
          name="name"
          value={NFT_m.name}
          onChange={(e) => handleInput(e, NFT_m, setNFT_m)}
        />
      </div>
      <div className="token_row">
        <textarea
          className="text_area"
          placeholder="Description"
          name="description"
          value={NFT_m.description}
          onChange={(e) => handleInput(e, NFT_m, setNFT_m)}
        />
      </div>
      <div className="token_row">
        <input
          className="input_field"
          type="text"
          placeholder="External Link"
          name="image"
          value={NFT_m.image}
          onChange={(e) => handleInput(e, NFT_m, setNFT_m)}
        />
      </div>
      <div className="token_row">
        <input
          type="number"
          className="input_field"
          placeholder="Nft's to mint"
        />
      </div>
      <div className="token_row">
        <button className="submit-button">Mint Nft</button>
      </div>
      </div>
    </div>
  );
};

export default App;
