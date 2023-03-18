import axios from "axios";
import React from "react";
import { useState } from "react";

import classes from "../Assets/Styles/guideProfileForm.module.css";
const GuideProfileForm = (props) => {
  const [guideData, setGuideData] = useState({
    firstName: props.currGuideData[0].firstName,
    lastName: props.currGuideData[0].lastName,
    userName: props.currGuideData[0].userName,
    languages: "",
    qualifications: "",
    experience: "",
    phNo: null,
    email: "",
    location:"",
    price:"",
    rating:""
  });
  const c1Handler = (e) => {
    setGuideData({ ...guideData, firstName: e.target.value });
    // console.log(guideData);
  };
  const c2Handler = (e) => {
    setGuideData({ ...guideData, lastName: e.target.value });
  };
  const c3Handler = (e) => {
    setGuideData({ ...guideData, languages: e.target.value });
  };
  
  const c5Handler = (e) => {
    setGuideData({ ...guideData, qualifications: e.target.value });
  };
  const c6Handler = (e) => {
    setGuideData({ ...guideData, experience: e.target.value });
  };
  const c7Handler = (e) => {
    setGuideData({ ...guideData, phNo: e.target.value });
  };
  const c8Handler = (e) => {
    setGuideData({ ...guideData, email: e.target.value });
  };
  const c10Handler=(e)=>{
    setGuideData({...guideData, location:e.target.value})
  }
  const c11Handler=(e)=>{
    setGuideData({...guideData, price:e.target.value})
  }
  const c12Handler=(e)=>{
    setGuideData({...guideData, rating:e.target.value})
  }
  const saveHandler = async () => {
    // console.log(guideData)
    window.location.reload(false);
    await axios.post("http://localhost:4000/guideFullData", guideData,{
      params: { currUserName: props.currGuideData[0].userName, },
    });
    // window.location.reload(false);
  };
  return (
    <>
      <div className={classes["container"]}>
        <form method="post">
          <div className={classes["row"]}>
            <h4>Account</h4>
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input
                type="text"
                placeholder="First Name"
                value={guideData.firstName}
                readOnly={true}
              />
              <div className={classes["input-icon"]}>
                <i class="fa fa-user"></i>
              </div>
            </div>
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input
                type="email"
                placeholder="Last name"
                value={guideData.lastName}
                readOnly={true}
              />
              <div className={classes["input-icon"]}>
                <i class="fa fa-envelope"></i>
              </div>
            </div>
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input
                type="text"
                placeholder="Username"
                value={guideData.userName}
                readOnly={true}
              />
              <div className={classes["input-icon"]}>
                <i class="fa fa-key"></i>
              </div>
            </div>
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input
                type="text"
                placeholder="Languages"
                onChange={c3Handler}
                value={guideData.languages}
              />
              <div className={classes["input-icon"]}>
                <i class="fa fa-key"></i>
              </div>
            </div>
            
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input
                type="text"
                placeholder="Qualification"
                onChange={c5Handler}
                value={guideData.qualifications}
              />
              <div className={classes["input-icon"]}>
                <i class="fa fa-key"></i>
              </div>
            </div>
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input
                type="text"
                placeholder="Experince"
                onChange={c6Handler}
                value={guideData.experience}
              />
              <div className={classes["input-icon"]}>
                <i class="fa fa-key"></i>
              </div>
            </div>
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input
                type="text"
                placeholder="Ph-No"
                onChange={c7Handler}
                value={guideData.phNo || ''}
              />
              <div className={classes["input-icon"]}>
                <i class="fa fa-key"></i>
              </div>
            </div>
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input
                type="text"
                placeholder="Email"
                onChange={c8Handler}
                value={guideData.email}
              />
              <div className={classes["input-icon"]}>
                <i class="fa fa-key"></i>
              </div>
            </div>
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input
                type="text"
                placeholder="Location"
                onChange={c10Handler}
                value={guideData.location}
              />
              <div className={classes["input-icon"]}>
                <i class="fa fa-key"></i>
              </div>
            </div>
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input
                type="text"
                placeholder="Price"
                onChange={c11Handler}
                value={guideData.price}
              />
              <div className={classes["input-icon"]}>
                <i class="fa fa-key"></i>
              </div>
            </div>
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input
                type="text"
                placeholder="Rating"
                onChange={c12Handler}
                value={guideData.rating}
              />
              <div className={classes["input-icon"]}>
                <i class="fa fa-key"></i>
              </div>
            </div>
            <div
              className={`${classes["input-group"]} ${classes["input-group-icon"]}`}
            >
              <input type="text" placeholder="Photo" />
              <div className={classes["input-icon"]}>
                <i class="fa fa-key"></i>
              </div>
            </div>
          </div>
        </form>
        <button type="submit" onClick={saveHandler}>
          Save
        </button>
      </div>
    </>
  );
};

export default GuideProfileForm;
