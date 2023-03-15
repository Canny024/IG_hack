import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import GuideProfileForm from "../components/GuideProfileForm";
import classes from "../Assets/Styles/guidePage.module.css";
import GuideHome from "../components/GuideHome";
const GuidePage = () => {
  const [currGuideData, setCurrGuideData] = useState({});
  const currUserName = localStorage.getItem("userName");
  const [profileView, setProfileView] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getGuideData", {
        params: { currUserName: currUserName },
      })
      .then((response) => {
        
        setCurrGuideData(response.data);
      });
  }, []);
  
  return (
    <>
      {Object.keys(currGuideData).length !== 0 && (
        <div className={classes["container"]}>
          <div className={classes["profile-header"]}>
            <div className={classes["profile-img"]}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQplKOeX6A3JacnS1ohT9sPu0aDnSzb28TmBQ&usqp=CAU"
                width="200"
                alt="Profile Image"
              />
            </div>
            <div className={classes["profile-nav-info"]}>
              <h3
                className={classes["user-name"]}
              >{`${currGuideData[0].firstName} ${currGuideData[0].lastName}`}</h3>
              <div className={classes["address"]}>
                <span id="country" className={classes["country"]}>
                 India
                </span>
              </div>
            </div>
            <div className={classes["profile-option"]}>
              <div className={classes["notification"]}>
                <i class="fa fa-bell"></i>
                <span className={classes["alert-message"]}>1</span>
              </div>
            </div>
          </div>

          <div className={classes["main-bd"]}>
            <div  className={classes["left-side"]}>
              <div className={classes["profile-side"]}>
                <p className={classes["mobile-no"]}>
                  <i class="fa fa-phone"></i> 7862734434
                </p>
                <p className={classes["user-mail"]}>
                  <i class="fa fa-envelope"></i> abhay@gmail
                </p>
                <div className={classes["user-bio"]}>
                  <h3>Bio</h3>
                  <p className={classes["bio"]}>
                    <ul>
                      <li>Language: Hindi</li>
                      <li>Experience: 1 year</li>
                      <li>Qualification: UG</li>
                      <li>Location: India</li>
                      <li>Availability: Yes</li>
                    </ul>
                  </p>
                </div>
                <div className={classes["profile-btn"]}>
                  <button className={classes["chatbtn"]} id="chatBtn">
                    <i class="fa fa-comment"></i>
                    <a
                      style={{ textDecoration: "none", color: "white" }}
                      href="/chatPage"
                    >
                      Chat
                    </a>
                  </button>
                  <button className={classes["createbtn"]} id="Create-post">
                    <i class="fa fa-plus"></i> Change Availability
                  </button>
                </div>
                <div className={classes["user-rating"]}>
                  <h3 className={classes["rating"]}>
                    4.3 *
                  </h3>
                  <div className={classes["rate"]}>
                    <div className={classes["star-outer"]}>
                      <div className={classes["star-inner"]}>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                      </div>
                    </div>
                    <span className={classes["no-of-user-rate"]}>
                      <span>123</span>&nbsp;&nbsp;reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{width:"85%"}} className={classes["right-side"]}>
              <div className={classes["nav"]}>
                <ul>
                  <li
                    onClick={() => {
                      setProfileView(true);
                      
                    }}
                    className={`${classes["user-post"]}`}
                  >
                    Home
                  </li>
                  <li
                    onClick={() => {
                      setProfileView(false);
                    }}
                    className={classes["user-review"]}
                  >
                    Edit Profile
                  </li>
                </ul>
              </div>
              {profileView && <GuideHome />}
              {!profileView && (
                <GuideProfileForm currGuideData={currGuideData} />
              )}
            </div>
          </div>
        </div>
      )}
      {currGuideData.length == 0 && <p>Loading....</p>}
    </>
  );
};

export default GuidePage;
