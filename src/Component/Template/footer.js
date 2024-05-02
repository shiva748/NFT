import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-area pb-120 pt-120" style={{backgroundImage: "url('img/bg-img/1.jpg')"}}>
      <img className="footer-bg-shape aos-init" src="img/core-img/shape1.png" alt="" data-aos="fade-up" data-aos-duration="500" data-aos-delay="200" />
      <div className="container">
        <div className="row">
          {/* Footer Widget */}
          <div className="col-12 col-lg-5">
            <div className="footer-widget-area mb-70 pe-lg-4 pe-xl-5 me-lg-4 me-xl-5 border-end">
              <NavLink className="d-block mb-4" to="/"><img className="light-logo" src="img/core-img/logo.png" alt="" /><img className="dark-logo" src="img/core-img/logo-white.png" alt="" /></NavLink>
              <p>It's crafted with the latest trend of design &amp; coded with all modern approaches.</p>
              <p className="mb-0">Call: +123 456 789 <br /> Email: help@example.com</p>
              {/* Social Icon */}
              <h5 className="mt-4 mb-3">Join the community</h5>
              <div className="footer-social-icon d-flex align-items-center flex-wrap">
                <a  data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Facbook" data-bs-original-title="Facbook"><img src="img/core-img/icons8-facebook.svg" alt="" /></a>
                <a  data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Twitter" data-bs-original-title="Twitter"><img src="img/core-img/icons8-twitter.svg" alt="" /></a>
                <a  data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Instagram" data-bs-original-title="Instagram"><img src="img/core-img/icons8-instagram.svg" alt="" /></a>
                <a  data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Slack" data-bs-original-title="Slack"><img src="img/core-img/icons8-slack.svg" alt="" /></a>
                <a  data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Youtube" data-bs-original-title="Youtube"><img src="img/core-img/icons8-player.svg" alt="" /></a>
              </div>
            </div>
          </div>
          {/* End Footer Widget */}
          {/* Footer Widget */}
          <div className="col-12 col-lg-7">
            <div className="row g-4">
              <div className="col-6 col-sm-4">
                <div className="footer-widget-area mb-70">
                  <h5 className="mb-4">Explore</h5>
                  <ul className="list-unstyled mb-0">
                  <li><NavLink to={"/nft/view"}>NFT's</NavLink></li>
                    <li><NavLink  to={"/nft/createnew"}>Mint a NFT</NavLink></li>
                  </ul>
                </div>
              </div>
              <div className="col-6 col-sm-4">
                <div className="footer-widget-area mb-70">
                  <h5 className="mb-4">Collections</h5>
                  <ul className="list-unstyled mb-0">
                    <li><NavLink to={"/collection/view"}>Collections</NavLink></li>
                    <li><NavLink  to={"/collection/createnew"}>Drop a Collection</NavLink></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
