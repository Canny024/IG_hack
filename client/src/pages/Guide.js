import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Assets/Styles/guide.css";
import Form from "../components/Form";

export default function Guide() {
  const [currGuideData, setCurrGuideData] = useState({});
  const currUserName = localStorage.getItem("userName");
  const [isAvailable, setIsAvailable] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/getGuideFullData", {
        params: { currUserName: currUserName },
      })
      .then((response) => {
        setCurrGuideData(response.data[0]);
        setIsAvailable(response.data[0].availaibility);
      });
    
  }, []);

  const availabilityChangeHandler = () => {
    axios.get("http://localhost:4000/availability", {
      params: { currUserName: currUserName },
    });
    window.location.reload(false);
  };
  const logoutHandler = () => {
    localStorage.removeItem("userName");
    Navigate("/");
  };

  let availabilityStyle={
    color:"white",
  }
  if(isAvailable){
    availabilityStyle={
      color:"white",
      backgroundColor:"green"
    }
  }
  else{
    availabilityStyle={
      color:"white",
      backgroundColor:"red"
    }
  }
  return (
    <body>
      <div class="main-content">
        {/* <!-- Top navbar --> */}
        <nav
          class="navbar navbar-top navbar-expand-md navbar-dark"
          id="navbar-main"
        >
          <div class="container-fluid">
            {/* <!-- Brand --> */}
            <a
              class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              href="#"
              target="_blank"
            >
              {currGuideData.userName}
            </a>
            {/* <!-- User --> */}
            <ul class="navbar-nav align-items-center d-none d-md-flex">
              <li class="nav-item dropdown">
                <a
                  class="nav-link pr-0"
                  onClick={logoutHandler}
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div class="media align-items-center">
                    <span class="avatar avatar-sm rounded-circle">
                      <img
                        alt="Image placeholder"
                        src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"
                      />
                    </span>
                    <div class="media-body ml-2 d-none d-lg-block">
                      <span
                        class="mb-0 text-sm  font-weight-bold"
                        style={{ cursor: "pointer" }}
                      >
                        Logout
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Header --> */}
        <div
          class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* <!-- Mask --> */}
          <span class="mask bg-gradient-default opacity-8"></span>
          {/* <!-- Header container --> */}
          <div class="container-fluid d-flex align-items-center">
            <div class="row">
              <div class="col-lg-7 col-md-10">
                <h1 class="display-2 text-white">{`Hello ${currGuideData.firstName}`}</h1>
                <p class="text-white mt-0 mb-5">
                  This is your profile page. You can see the progress you've
                  made with your work and manage your profile.
                </p>
                <a href="#edit" class="btn btn-info">
                  Edit profile
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Page content --> */}
        <div class="container-fluid mt--7">
          <div class="row">
            <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
              <div class="card card-profile shadow">
                <div class="row justify-content-center">
                  <div class="col-lg-3 order-lg-2">
                    <div class="card-profile-image">
                      <a href="#">
                        <img
                          src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"
                          class="rounded-circle"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div class="d-flex justify-content-between">
                    <a
                      onClick={availabilityChangeHandler}
                      style={availabilityStyle}
                      class="btn btn-sm btn-info mr-4"
                    >
                    Change Availability
                    </a>
                    <a
                      href="/chatPage"
                      class="btn btn-sm btn-default float-right"
                    >
                      Message
                    </a>
                  </div>
                </div>
                <div class="card-body pt-0 pt-md-4">
                  <div class="row">
                    <div class="col">
                      <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span class="heading">4*</span>
                          <span class="description">Ratings</span>
                        </div>
                        <div>
                          <span class="heading">{currGuideData.price}</span>
                          <span class="description">Price</span>
                        </div>
                        <div>
                          <span class="heading">{`${currGuideData.experience} years`}</span>
                          <span class="description">Experience</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <h3>
                      {`${currGuideData.firstName} ${currGuideData.lastName}`}
                    </h3>
                    <div class="h5 mt-4">
                      <i class="ni business_briefcase-24 mr-2"></i>{`Language: ${currGuideData.languages}`}
                    </div>
                    <div>
                      <i class="ni education_hat mr-2"></i>{`Location: ${currGuideData.city}, ${currGuideData.country}`}
                    </div>
                    <hr class="my-4" />
                    <p>
                      {currGuideData.about}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Form />
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6 m-auto text-center">
            <div class="copyright">
              <p>
                This Is{" "}
                <a
                  href="https://www.creative-tim.com/product/argon-dashboard"
                  target="_blank"
                >
                  Tourist Guide
                </a>{" "}
                by Abhay && Aniket
              </p>
            </div>
          </div>
        </div>
      </footer>
    </body>
  );
}
