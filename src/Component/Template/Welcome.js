import React from "react";
import { UseSelector, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const Welcome = () => {
  const account = useSelector((state) => {
    return state.account;
  });
  return (
    <>
      <div class="welcome-area">
        <div class="container">
          <div class="row align-items-center">
            {/* Welcome Content */}
            <div class="col-12 col-sm-10 col-md-6">
              <div class="welcome-content mb-5 mb-md-0">
                <h2
                  data-aos="fade-up"
                  data-aos-duration="750"
                  data-aos-delay="500"
                >
                  <strong>Explore, buy, and sell exceptional NFTs.</strong>
                </h2>
                <p
                  class="mb-4"
                  data-aos="fade-up"
                  data-aos-duration="750"
                  data-aos-delay="800"
                >
                  It's crafted with the latest trend of design & coded with all
                  modern approaches.
                </p>
                <div
                  class="hero-btn-group"
                  data-aos="fade-up"
                  data-aos-duration="750"
                  data-aos-delay="1200"
                >
                </div>
              </div>
            </div>
            {/* Welcome Thumb */}
            <div class="col-12 col-sm-9 col-md-6">
              <div
                class="welcome-thumb"
                data-aos="fade-up"
                data-aos-duration="750"
                data-aos-delay="500"
              >
                <img src="img/illustrator/2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </>
  );
};

export default Welcome;
