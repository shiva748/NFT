import React, { useState, useEffect } from "react";
import Collectioncard from "../Template/Collectioncard";
import { useSelector } from "react-redux";
const ListCollection = () => {
  const { nft } = useSelector((state) => state.account);
  const [Collection, setCollection] = useState(0);

  const fetchCollection = async () => {
    if (nft) {
      try {
        let collectionar = Number(await nft.methods.nextCollectionId().call());
        setCollection(collectionar)
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    }
  };
  useEffect(() => {
    fetchCollection();
  }, [nft]);

  return (
    <>
      <div
        className="breadcrumb-wrapper"
        style={{ margin: "10px", padding: "10px" }}
      >
        <div className="container">
          <div className="breadcrumb-content">
            <h2 className="breadcrumb-title">Collection's</h2>
            <nav aria-label="breadcrumb"></nav>
          </div>
        </div>
      </div>

      <div className="featured-items-wrapper">
        <div className="container">
          <div className="row g-4 justify-content-center">
          {Array.from({ length: Collection }).map((_, i) => {
              return <Collectioncard index={i} />;
            })}
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </>
  );
};

export default ListCollection;
