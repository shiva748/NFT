import React, { useState } from "react";
import { useSelector } from "react-redux";
import validator from "validator";

const MintCollection = () => {
  const { account, token, nft, web3 } = useSelector((state) => state.account);
  const [loading, setloading] = useState(false);
  const [Collection, setCollection] = useState({
    name: "",
    description: "",
    URL: "",
    limit: "",
    price: "",
  });
  const handelinput = (e) => {
    setCollection({ ...Collection, [e.target.name]: e.target.value });
  };
  const MintCollection = async () => {
    if (loading) {
      return;
    }
    if (!validator.isURL(Collection.URL)) {
      alert("Please enter a valid Url");
      return;
    }
    setloading(true);
    try {
      const allowance = await token.methods
        .allowance(account, nft._address)
        .call();
      const C_allowance = web3.utils.fromWei(Number(allowance), "ether");
      if (Number(1000) > C_allowance) {
        await token.methods
          .approve(
            nft._address,
            web3.utils.toWei(Number(1000) - C_allowance, "ether")
          )
          .send({ from: account });
      }
      await nft.methods
        .createCollection(
          Collection.name,
          Collection.description,
          Collection.limit,
          web3.utils.toWei(Number(Collection.price), "ether"),
          JSON.stringify({
            name: Collection.name,
            description: Collection.description,
            URL: Collection.URL,
            image: Collection.URL,
          })
        )
        .send({ from: account });
      alert("Collection Minted");
      setCollection({
        name: "",
        description: "",
        URL: "",
        limit: "",
        price: "",
      });
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log(error.message);
    }
  };
  return (
    <>
      <div
        className="breadcrumb-wrapper"
        style={{ margin: "10px", padding: "10px" }}
      >
        <div className="container">
          <div className="breadcrumb-content">
            <h2 className="breadcrumb-title">Create New</h2>
            <nav aria-label="breadcrumb"></nav>
          </div>
        </div>
      </div>

      <div class="divider"></div>
      <div className="create-new-wrapper">
        <div className="container">
          <div className="row g-5 justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="create-new-form border shadow-sm p-4 p-sm-5">
                <h2 className="mb-4">Create new Collection</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    MintCollection();
                  }}
                >
                  <div className="row align-items-center">
                    <div className="col-12"></div>
                    <div className="col-12">
                      <div className="form-group mb-4">
                        <label className="mb-2 fz-16" htmlFor="title">
                          Title
                        </label>
                        <input
                          className="form-control"
                          id="title"
                          name="name"
                          type="text"
                          onChange={(e) => {
                            handelinput(e);
                          }}
                          value={Collection.name}
                          placeholder="Macaw Bird"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-4">
                        <label className="mb-2 fz-16" htmlFor="description">
                          Description
                        </label>
                        <input
                          className="form-control"
                          id="description"
                          type="text"
                          name="description"
                          onChange={(e) => {
                            handelinput(e);
                          }}
                          value={Collection.description}
                          placeholder="Write short description"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group mb-4">
                        <label className="mb-2 fz-16" htmlFor="description">
                          URL
                        </label>
                        <input
                          className="form-control"
                          id="URL"
                          name="URL"
                          onChange={(e) => {
                            handelinput(e);
                          }}
                          value={Collection.URL}
                          type="text"
                          placeholder="URL"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group mb-4">
                        <label class="mb-2 fz-16" for="price">
                          Price
                        </label>
                        <input
                          class="form-control"
                          id="price"
                          name="price"
                          onChange={(e) => {
                            handelinput(e);
                          }}
                          value={Collection.price}
                          type="text"
                          placeholder="0.324 ETH"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="form-group mb-4">
                        <label class="mb-2 fz-16" for="price">
                          Limit
                        </label>
                        <input
                          class="form-control"
                          id="limit"
                          name="limit"
                          onChange={(e) => {
                            handelinput(e);
                          }}
                          value={Collection.limit}
                          type="text"
                          placeholder="10"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <button className="btn btn-primary rounded-pill w-100">
                        {loading ? "Minting..." : "Mint"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12 col-sm-8 col-lg-4">
              {/* Preview Card */}
              <div className="nft-card card shadow-sm">
                <div className="card-body">
                  <div className="img-wrap">
                    <img
                      src={
                        Collection.URL ? Collection.URL : "img/bg-img/17.jpg"
                      }
                      alt=""
                    />
                    {/* Badge */}
                  </div>
                  {/* Others Info */}
                  <div className="row gx-2 align-items-center mt-3">
                    <div className="col-8"></div>
                    <div className="col-4 text-end">
                      <button className="wishlist-btn" type="button">
                        <i className="bi"></i>
                      </button>
                    </div>
                  </div>
                  {/* Meta Info */}
                  <div className="row gx-2 align-items-center mt-2">
                    <div className="col-8">
                      <div className="name-info d-flex align-items-center">
                        <div className="author-img position-relative">
                          <img
                            className="shadow"
                            src="img/bg-img/u1.jpg"
                            alt=""
                          />
                          <i className="bi bi-check position-absolute bg-success"></i>
                        </div>
                        <div className="name-author">
                          <a
                            className="name d-block hover-primary fw-bold text-truncate"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-original-title="Macaw Bird"
                          >
                            Macaw Bird
                          </a>
                          <a className="author d-block fz-12 hover-primary text-truncate">
                            @creative_art
                          </a>
                        </div>
                        <div className="col-4">
                          <div className="price text-end">
                            <span className="fz-12 d-block"> Price</span>
                            <h6 className="mb-0">
                              {!Collection.price
                                ? "xxx SP"
                                : Collection.price + "SP"}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Button */}
                  <div className="row gx-2 align-items-center mt-3">
                    <div className="col-6">
                      <a className="btn btn-primary btn-sm rounded-pill">Buy</a>
                    </div>
                    <div className="col-6 text-end">
                      <a className="btn btn-minimal btn-sm hover-primary">
                        {" "}
                        <i className="bi bi-activity me-1"></i>Activity
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <h5 className="mb-0 mt-3 text-center">
                <i className="bi bi-eye me-1"></i>Live Preview
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </>
  );
};

export default MintCollection;
