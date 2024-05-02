import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import account from "../States/account";

const Nftcard = (props) => {
  const { nft, account } = useSelector((state) => state.account);
  const [Nft, setNft] = useState({ URL: "", name: "", description: "" });

  const fetchNft = async () => {
    if (nft) {
      try {
        let Nft_uri = await nft.methods.tokenURI(props.index).call();
        if(props.filter){
          let NftOwner = await nft.methods.ownerOf(props.index).call();
          if(NftOwner.toUpperCase() != account.toUpperCase()){
            setNft({})
          }else{
            setNft(JSON.parse(Nft_uri));
          }
        }else{
          setNft(JSON.parse(Nft_uri));
        }
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    }
  };

  useEffect(() => {
    fetchNft();
  }, [nft]);
  return (
    <>
      {Nft.name ? (
        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
          <div className="nft-card card featured-card border-0 bg-gray">
            <div className="img-wrap">
              <img src={Nft.URL} alt="" style={{ width: '289px', height: '289px' }}/>
              {/* Dropdown */}
            </div>
            <div className="card-body">
              {/* Others Info */}
              {/* Meta Info */}
              <div className="row gx-2 align-items-center mt-2">
                <div className="col-15">
                  <div className="name-info d-flex align-items-center">
                    <div className="name-author">
                      <a
                        className="name d-block hover-primary fw-bold"
                        href="item-details.html"
                        title={Nft.name.length>15?Nft.name.slice(0,30):Nft.name}
                      >
                        {Nft.name.length > 15 ? Nft.name.slice(0, 15) : Nft.name}

                      </a>
                      <a
                        className="author d-block fz-12 hover-primary text-truncate"
                        href="author.html"
                      >
                        {Nft.description}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Button */}
              <div className="row gx-2 align-items-center mt-3">
                <div className="col-6">
                  <NavLink
                    className="btn btn-primary rounded-pill btn-sm"
                    to={`/nft/details?ind=${props.index}`}
                  >
                    View
                  </NavLink>
                </div>
                <div className="col-6 text-end">
                  <a
                    className="btn btn-minimal btn-sm hover-primary"
                    href="activity.html"
                  >
                    {" "}
                    <i className="bi bi-activity me-1"></i>Activity
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

export default Nftcard;
