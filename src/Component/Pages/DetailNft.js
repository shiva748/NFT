import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import account from "../States/account";
const DetailNft = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { nft, account, token, web3 } = useSelector((state) => state.account);
  const [Nft, setNft] = useState({
    URL: "",
    name: "",
    description: "",
    owner: "",
    price: "",
    flag: "",
  });
  const fetchNft = async () => {
    if (nft) {
      try {
        let Nft_uri = await nft.methods.tokenURI(queryParams.get("ind")).call();
        let Nft_owner = await nft.methods
          .ownerOf(queryParams.get("ind"))
          .call();
        let listed = await nft.methods.listed(queryParams.get("ind")).call();
        setNft({
          ...JSON.parse(Nft_uri),
          owner: Nft_owner.toUpperCase(),
          price: web3.utils.fromWei(Number(listed.price), "ether"),
          flag: listed.flag,
        });
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    }
  };
  const List = async () => {
    try {
      let approved = await nft.methods
        .getApproved(queryParams.get("ind"))
        .call();
      if (approved.toUpperCase() != nft._address.toUpperCase()) {
        let approve = await nft.methods
          .approve(nft._address, queryParams.get("ind"))
          .send({ from: account });
      }
      let listing = await nft.methods
        .list(
          queryParams.get("ind"),
          web3.utils.toWei(Number(Nft.price), "ether")
        )
        .send({ from: account });
      alert("Nft Listed for sale");
      setNft({ ...Nft, flag: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  const buy = async () => {
    try {
      let allowance = await token.methods
        .allowance(account, nft._address)
        .call();
      const C_allowance = web3.utils.fromWei(Number(allowance), "ether");
      if (Number(Nft.price) + 10 > C_allowance) {
        await token.methods
          .approve(
            nft._address,
            web3.utils.toWei(Number(Nft.price) + 10 - C_allowance, "ether")
          )
          .send({ from: account });
      }
      let buyr = await nft.methods
        .BuyNft(queryParams.get("ind"))
        .send({ from: account });
      fetchNft();
      alert("Nft bought successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  const setprice = (price) => {
    setNft({ ...Nft, price });
  };
  useEffect(() => {
    fetchNft();
  }, [nft]);
  return (
    <>
      {Nft.name ? (
        <>
          <div
            className="breadcrumb-wrapper"
            style={{ margin: "10px", padding: "10px" }}
          >
            <div className="container">
              <div className="breadcrumb-content">
                <h2 className="breadcrumb-title">Item Details</h2>
                <nav aria-label="breadcrumb"></nav>
              </div>
            </div>
          </div>
          <div className="item-details-wrap">
            <div className="container">
              <div className="row g-4 g-lg-5 justify-content-center">
                <div className="col-12 col-md-12 col-lg-6">
                  <div className="item-big-thumb">
                    <img src={Nft.URL} alt="" data-action="zoom" />
                  </div>
                </div>
                {/* Item Details Content */}
                <div className="col-12 col-md-9 col-lg-6">
                  <div className="item-details-content mt-5 mt-lg-0">
                    <h2 className="my-3">{Nft.name}</h2>
                    <div className="d-flex align-items-center mb-4">
                      <div className="author-img position-relative me-3">
                        <img
                          className="shadow"
                          src="img/bg-img/u3.jpg"
                          alt=""
                        />
                        <i className="bi bi-check position-absolute bg-primary"></i>
                      </div>
                      <div className="name-author">
                        <span className="d-block fz-14">{Nft.owner}</span>
                        <a className="author d-block fz-16 hover-primary text-truncate">
                          Owner
                        </a>
                      </div>
                    </div>
                    {Nft.owner == account.toUpperCase() ? (
                      <div className="row align-items-end">
                        <div className="col-6 col-sm-4 col-lg-5">
                          <input
                            type="number"
                            value={Nft.price}
                            className="text-center mb-0 border border-2 px-3 py-2 border-primary d-inline-block rounded text-primary w-100"
                            onChange={(e) => {
                              setprice(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-6 col-sm-4 col-lg-5">
                          <a
                            className="btn btn-primary rounded-pill w-100"
                            onClick={List}
                          >
                            <img
                              className="me-1"
                              src="img/core-img/fire.png"
                              alt=""
                            />
                            {Nft.flag ? "Relist" : "List"}
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="row align-items-end">
                        <div className="col-6 col-sm-4">
                          <p className="mb-2">price</p>
                          <h5 className="text-center mb-0 border border-2 px-3 py-2 border-primary d-inline-block rounded text-primary w-100">
                            {Nft.flag
                              ? `${Nft.price} Sp`
                              : "Not avilable for sale"}
                          </h5>
                        </div>
                        {Nft.flag ? (
                          <div className="col-6 col-sm-4 col-lg-5">
                            <a
                              className="btn btn-primary rounded-pill w-100"
                              onClick={buy}
                            >
                              <img
                                className="me-1"
                                src="img/core-img/fire.png"
                                alt=""
                              />
                              Buy
                            </a>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}

                    <div className="border-top w-75 my-4"></div>
                    <div className="short-description">
                      <h5>Description</h5>
                      <p className="mb-0">{Nft.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default DetailNft;
