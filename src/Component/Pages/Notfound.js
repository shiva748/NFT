import React from "react";
import { NavLink } from "react-router-dom";
const Notfound = () => {
  return (
    <div className="funto-error-area text-center pt-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-9 col-lg-6">
            <img className="mb-5" src="img/illustrator/6.png" alt="" />
            <h2>Uh oh! Nothing found.</h2>
            <p>We couldn't find any results for your search. Try again.</p>
            <NavLink className="btn btn-primary mt-3 rounded-pill" to="/">
              <i className="me-1 bi bi-house"></i>Go home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notfound;
