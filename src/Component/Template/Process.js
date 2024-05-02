import React from "react";

const Process = () => {
  return (
    <>
      <div
        class="process-wrapper"
        data-aos="zoom-in"
        data-aos-duration="500"
        data-aos-delay="200"
      >
        <div class="container">
          <div class="row g-4 g-xxl-5 align-items-center justify-content-center">
            <div class="col-12 col-sm-6 col-xl-3">
              {/* Single Card */}
              <div
                class="single-process-card card bg-gray border-0"
                data-aos="fade-up"
                data-aos-duration="750"
                data-aos-delay="400"
              >
                <div class="card-body p-4 text-center">
                  <img
                    class="mb-3 mx-auto"
                    src="img/illustrator/4.png"
                    alt=""
                  />
                  <h5 class="mb-3">
                    <strong>Create your account & add wallet</strong>
                  </h5>
                  <p class="mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                {/* Step */}
                <div class="step-number">1</div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-3">
              {/* Single Card */}
              <div
                class="single-process-card card bg-gray border-0"
                data-aos="fade-up"
                data-aos-duration="750"
                data-aos-delay="600"
              >
                <div class="card-body p-4 text-center">
                  <img
                    class="mb-3 mx-auto"
                    src="img/illustrator/2.png"
                    alt=""
                  />
                  <h5 class="mb-3">
                    <strong>Get approval from our review team</strong>
                  </h5>
                  <p class="mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                {/* Step */}
                <div class="step-number">2</div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-3">
              {/* Single Card */}
              <div
                class="single-process-card card bg-gray border-0"
                data-aos="fade-up"
                data-aos-duration="750"
                data-aos-delay="800"
              >
                <div class="card-body p-4 text-center">
                  <img
                    class="mb-3 mx-auto"
                    src="img/illustrator/3.png"
                    alt=""
                  />
                  <h5 class="mb-3">
                    <strong>Create your NFT's & list them for sale</strong>
                  </h5>
                  <p class="mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                {/* Step */}
                <div class="step-number">3</div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-xl-3">
              {/* Single Card */}
              <div
                class="single-process-card card bg-gray border-0"
                data-aos="fade-up"
                data-aos-duration="750"
                data-aos-delay="1000"
              >
                <div class="card-body p-4 text-center">
                  <img
                    class="mb-3 mx-auto"
                    src="img/illustrator/1.png"
                    alt=""
                  />
                  <h5 class="mb-3">
                    <strong>Now sell your items & earn rewards</strong>
                  </h5>
                  <p class="mb-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                {/* Step */}
                <div class="step-number">4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="divider"></div>
    </>
  );
};

export default Process;
