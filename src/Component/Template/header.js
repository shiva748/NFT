import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateaccount } from "../States/account";
import Web3 from "web3";
import TokenAbi from "../abi/Token.json";
import NFTAbi from "../abi/NFT.json";
import { NavLink } from "react-router-dom";

function Navbar() {
  const tokenaddress = "0x506C421A7054Aad5F8BC6554BF9F5A89B4c0B37c";
  const nftaddress = "0x16B4F8724DCc51044A33c85Ebcc4f71A902ff155";
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const [owner, setowner] = useState("");
  const initializeweb3 = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const TokenContract = await new web3.eth.Contract(TokenAbi, tokenaddress);
      const NftContract = await new web3.eth.Contract(NFTAbi, nftaddress);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      dispatch(
        updateaccount({
          web3,
          account: accounts[0],
          token: TokenContract,
          nft: NftContract,
        })
      );
      let owner = await NftContract.methods.owner().call();
      setowner(owner);
    } else {
      alert("Please install metamask");
    }
  };
  const Withdraw = async () => {
    try {
      if (owner.toUpperCase() != account.account.toUpperCase()) {
        alert("you are not the owner");
      }
      let res = await account.nft.methods.widthdraw().send({ from: account.account });
      alert("withdraw was successfull");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    initializeweb3();
  }, []);

  const Disconnect = () => {
    dispatch(updateaccount({ account: "", web3: "", nft: "", token: "" }));
  };
  return (
    <>
      <header className="header-area" style={{ position: "static" }}>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            {/* Navbar Brand */}
            <NavLink className="navbar-brand" to={"/"}>
              <img className="light-logo" src="img/core-img/logo.png" alt="" />
              <img
                className="dark-logo"
                src="img/core-img/logo-white.png"
                alt=""
              />
            </NavLink>
            {/* Navbar Toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#funtoNav"
              aria-controls="funtoNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-grid"></i>
            </button>
            {/* Navbar */}
            <div className="collapse navbar-collapse" id="funtoNav">
              <ul className="navbar-nav navbar-nav-scroll my-2 my-lg-0">
                <li className="ft-dd">
                  <a href="#">NFT'S</a>
                  <ul className="ft-dd-menu">
                    <li>
                      <NavLink to="/nft/view">NFT's</NavLink>
                    </li>
                    <li>
                      <NavLink to="/nft/createnew">Mint NFT</NavLink>
                    </li>
                  </ul>
                </li>
                <li className="ft-dd">
                  <a href="#">Collections</a>
                  <ul className="ft-dd-menu">
                    <li>
                      <NavLink to={"/collection/view"}>Collection</NavLink>
                    </li>
                    <li>
                      <NavLink to={"/collection/createnew"}>
                        Drop a Collection
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="header-meta d-flex align-items-center ms-lg-auto">
                {account.account ? (
                  <div className="user-dropdown dropdown mx-3">
                    <button
                      className="btn dropdown-toggle user-btn"
                      id="dropdownMenuButton1"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots"></i>
                    </button>
                    <ul
                      className="dropdown-menu mt-3"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li style={{ cursor: "pointer" }}>
                        {/* eslint-disable-next-line */}
                        <a className="dropdown-item" onClick={initializeweb3}>
                          <i className="me-2 bi bi-arrow-clockwise"></i>Refresh
                        </a>
                      </li>
                      <li style={{ cursor: "pointer" }}>
                        {/* eslint-disable-next-line */}
                        <NavLink className="dropdown-item" to={"/mynft"}>
                          <i className="me-2 bi bi-collection"></i>My Nft's
                        </NavLink>
                      </li>
                      {owner.toUpperCase() == account.account.toUpperCase() ? (
                        <li style={{ cursor: "pointer" }}>
                          {/* eslint-disable-next-line */}
                          <a className="dropdown-item" onClick={Withdraw}>
                            <i className="me-2 bi bi-coin"></i>Withdraw
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                ) : (
                  ""
                )}
                {/* Create New Button */}
                {/* eslint-disable-next-line */}
                <a
                  className="btn btn-warning btn-sm rounded-pill"
                  onClick={account.account ? Disconnect : initializeweb3}
                >
                  {!account.account ? "Connect" : "Disconnect"}
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div
        style={{
          textAlign: "center",
          color: account.account ? "lightgreen" : "red",
        }}
      >
        {account.account ? account.account : "Not Connected"}
      </div>
    </>
  );
}

export default Navbar;
