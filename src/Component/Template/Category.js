import React from 'react';
import { NavLink } from 'react-router-dom';

const BrowseByCategory = () => {
  return (
    <>
    <div className="collection-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-7">
            <div className="section-heading">
              <h2 className="mb-0 ms-3">Browse by category</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-4 justify-content-center">
          {/* Category Card */}
          <div className="col-12 col-md-10 col-lg-4">
            <div className="category-card card shadow-sm">
              <div className="card-body">
                <div className="row g-1">
                  <div className="col-6"><img className="rounded" src="img/bg-img/39.jpg" alt="" /><img className="rounded" src="img/bg-img/38.jpg" alt="" /></div>
                  <div className="col-6"><img className="rounded" src="img/bg-img/6.jpg" alt="" /><img className="rounded" src="img/bg-img/10.jpg" alt="" /></div>
                </div>
                <div className="row mt-3">
                  <div className="col-8">
                    <h5 className="mb-0">Nft's</h5>
                  </div>
                  <div className="col-4 text-end"><NavLink className="btn btn-minimal hover-primary" to={"/nft/view"}>View all<i className="ms-1 fz-14 bi bi-arrow-right"></i></NavLink></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-10 col-lg-4">
            <div className="category-card card shadow-sm">
              <div className="card-body">
                <div className="row g-1">
                  <div className="col-6"><img className="rounded" src="img/bg-img/39.jpg" alt="" /><img className="rounded" src="img/bg-img/38.jpg" alt="" /></div>
                  <div className="col-6"><img className="rounded" src="img/bg-img/6.jpg" alt="" /><img className="rounded" src="img/bg-img/10.jpg" alt="" /></div>
                </div>
                <div className="row mt-3">
                  <div className="col-8">
                    <h5 className="mb-0">Collection's</h5>
                  </div>
                  <div className="col-4 text-end"><NavLink className="btn btn-minimal hover-primary" to={"/collection/view"}>View all<i className="ms-1 fz-14 bi bi-arrow-right"></i></NavLink></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Category Card */}
          {/* Repeat the pattern for other cards */}
        </div>
      </div>
    </div>
    <div class="divider"></div>
    </>
  );
}

export default BrowseByCategory;
