import React from "react";
import Home from "./Component/Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Template/header";
import { Provider } from "react-redux";
import store from "./store";
import Mintnft from "./Component/Template/Mintnft";
import Footer from "./Component/Template/footer";
import DetailNft from "./Component/Pages/DetailNft";
import Notfound from "./Component/Pages/Notfound";
import NewCollection from "./Component/Pages/NewCollection";
import ListNft from "./Component/Pages/ListNft";
import ListCollection from "./Component/Pages/ListCollection";
import MyNft from "./Component/Pages/MyNft";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/nft/createnew" element={<Mintnft />} />
            <Route exact path="/nft/details" element={<DetailNft />} />
            <Route exact path="/nft/view" element={<ListNft />} />
            <Route exact path="/mynft" element={<MyNft />} />
            <Route
              exact
              path="/collection/createnew"
              element={<NewCollection />}
            />
            <Route exact path="/collection/view" element={<ListCollection />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
          <Footer />
        </Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
