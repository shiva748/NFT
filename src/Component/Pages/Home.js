import React from "react";
import Welcome from "../Template/Welcome";
import Process from "../Template/Process";
import BrowseByCategory from "../Template/Category";
const Home = () => {
  return (
    <>
      <Welcome />
      <Process/>
      <BrowseByCategory/>
    </>
  );
};

export default Home;
