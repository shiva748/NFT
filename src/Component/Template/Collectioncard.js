import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Collectioncard = (props) => {
  const { nft, token, web3, account } = useSelector((state) => state.account);
  const [Collection, setCollection] = useState({
    URL: "",
    name: "",
    description: "",
  });

  const fetchCollection = async () => {
    if (nft) {
      try {
        let Collection_uri = await nft.methods
          .getCreatedCollections(props.index)
          .call();
        if (Collection_uri.tokenIds.length === Number(Collection_uri.limit)) {
          setCollection({});
        } else {
          setCollection({
            ...Collection_uri,
            URL: JSON.parse(Collection_uri.uri).URL,
            price:web3.utils.fromWei(Number(Collection_uri.price), "ether")
          });
        }
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    }
  };
  
  const [loading, setloading] = useState(false);
  const mintNft = async () => {
    if (loading) {
      return;
    }
    setloading(true);
    try {
      if (Collection.creator.toUpperCase() != account.toUpperCase()) {
        const allowance = await token.methods
          .allowance(account, nft._address)
          .call();
        const C_allowance = web3.utils.fromWei(Number(allowance), "ether");
        if (Number(Collection.price) + 100 > C_allowance) {
          await token.methods
            .approve(
              nft._address,
              web3.utils.toWei(
                Number(Collection.price) + 100 - C_allowance,
                "ether"
              )
            )
            .send({ from: account });
        }
      }
      await nft.methods
        .mint_fromcollection(props.index)
        .send({ from: account });
      alert("Nft Minted");
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchCollection();
  }, [nft]);
  return (
    <>
      {Collection.name ? (
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
          <div className="nft-card card featured-card border-0 bg-gray">
            <div className="img-wrap">
              <img
                src={Collection.URL}
                alt=""
                style={{ width: "289px", height: "289px" }}
              />
              {/* Dropdown */}
            </div>
            <div className="card-body">
              {/* Others Info */}
              {/* Meta Info */}
              <div className="row gx-2 align-items-center mt-2">
                <div className="col-10">
                  <div className="name-info d-flex align-items-center">
                    <div className="name-author">
                      <a
                        className="name d-block hover-primary fw-bold"
                        href="item-details.html"
                        title={Collection.name}
                      >
                        {Collection.name}
                      </a>
                      <a
                        className="author d-block fz-12 hover-primary text-truncate"
                        href="author.html"
                      >
                        {Collection.description}
                      </a>
                    </div>
                    <div className="col-4">
                      <div className="price text-end">
                        <span className="fz-12 d-block">Price</span>
                        <h6 className="mb-0">{Number(Collection.price)} SP</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Button */}
              <div className="row gx-2 align-items-center mt-3">
                <div className="col-6">
                  <a
                    className="btn btn-primary rounded-pill btn-sm"
                    onClick={mintNft}
                  >
                    Buy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Collectioncard;
