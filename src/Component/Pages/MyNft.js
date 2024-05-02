import React, { useState, useEffect } from "react";
import Nftcard from "../Template/Nftcard";
import { useSelector } from "react-redux";
import account from "../States/account";
const MyNft = () => {
  const { nft } = useSelector((state) => state.account);
  const [Nftcount, setNftcount] = useState({ count: 0, maxcount: 0 });

  const fetchcount = async () => {
    if (nft) {
      try {
        let count = Number(await nft.methods.count_NFT().call());
        setNftcount({ count: count < 10 ? count : 10, maxcount: count });
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    }
  };
  const loadmore = () => {
    if (Nftcount.maxcount - Nftcount.count >= 10) {
      setNftcount({ ...Nftcount, count: Nftcount.count + 10 });
    } else {
      setNftcount({ ...Nftcount, count: Nftcount.maxcount });
    }
  };
  useEffect(() => {
    fetchcount();
  }, [nft]);

  return (
    <>
      <div
        className="breadcrumb-wrapper"
        style={{ margin: "10px", padding: "10px" }}
      >
        <div className="container">
          <div className="breadcrumb-content">
            <h2 className="breadcrumb-title">My NFT'S</h2>
            <nav aria-label="breadcrumb"></nav>
          </div>
        </div>
      </div>

      <div className="featured-items-wrapper">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {Array.from({ length: Nftcount.count }).map((_, i) => {
              return <Nftcard index={i} filter={true}/>;
            })}
          </div>
        </div>
        <div className="container">
          <div className="text-center mt-70">
            <a className="btn btn-primary btn-sm rounded-pill" onClick={loadmore}>
              Load more<i className="ms-1 bi bi-arrow-repeat"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </>
  );
};

export default MyNft;
