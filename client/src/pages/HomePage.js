import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Assets/Styles/home.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
const HomePage = () => {
  useEffect(() => {
    let container = document.getElementById("container");
    setTimeout(() => {
      container.classList.add("home-sign-in");
    }, 200);
  }, []);

  const toggle = () => {
    let container = document.getElementById("container");

    container.classList.toggle("home-sign-in");
    container.classList.toggle("home-sign-up");
  };

  const options = ["Guide", "Tourist"];

  const Navigate = useNavigate();
  const [loginuserName, setloginUserName] = useState("");
  const [loginpassWord, setloginPassWord] = useState("");
  localStorage.setItem("RoomKey", "JDKVELDNPgf6CbmdAAAL");
  const loginuserNameChangeHandler = (e) => {
    setloginUserName(e.target.value);
  };
  const loginpassWordChangeHandler = (e) => {
    setloginPassWord(e.target.value);
  };
  const loginsubmitHandler = async (e) => {
    // e.preventDefault();
    let loginData = {
      userName: loginuserName,
      passWord: loginpassWord,
    };
    // console.log(loginData);
    const res = await axios({
      method: "post",
      url: "http://localhost:4000/loginData",
      data: {
        userName: loginuserName,
        passWord: loginpassWord,
      },
    });
    console.log("click")
    console.log(res);
    let userType
    if(res.data!== "wrong Credentials"){
      userType = res.data;
      console.log(userType);
      localStorage.setItem("userName", loginuserName);
      Navigate(`/${userType}Page`);
    }
    else{
      window.alert("Wrong Credentials")
      window.location.reload(false)
    }  
  };
  // SignUp

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [userType, setUserType] = useState("");
  const firstNameChangeHandler = (e) => {
    setfirstName(e.target.value);
  };
  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value);
  };
  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  const passWordChangeHandler = (e) => {
    setPassWord(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const signUpData = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      passWord: passWord,
      userType: userType,
    };
    console.log(signUpData);
    const res=await axios.post("http://localhost:4000/signUpData", signUpData);
    if(res.data=="userName already exist"){
      window.alert(res.data);
      window.location.reload(false);
    }
    else{
      toggle()
    }

  };

  const dropdownChangeHandler = (e) => {
    setUserType(e.value);
  };

  return (
    <div id="container" className="home-container">
      {/* <!-- FORM SECTION --> */}
      <div className="home-row">
        {/* <!-- SIGN UP --> */}
        <div className="home-col home-align-items-center home-flex-col home-sign-up">
          <div className="home-form-wrapper home-align-items-center">
            <div className="home-form home-sign-up">
              <form method="post">
                <div className="home-input-group">
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    onChange={userNameChangeHandler}
                    value={userName}
                  />
                </div>
                <div className="home-input-group">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    onChange={firstNameChangeHandler}
                    value={firstName}
                  />
                </div>
                <div className="home-input-group">
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    onChange={lastNameChangeHandler}
                    value={lastName}
                  />
                </div>
                <div className="home-input-group">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={passWordChangeHandler}
                    value={passWord}
                  />
                </div>
                <Dropdown
                  className="home-dropdown"
                  options={options}
                  value={userType}
                  onChange={dropdownChangeHandler}
                  placeholder="You are?"
                />
              </form>

              <button onClick={submitHandler}>Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b onClick={toggle} className="home-pointer">
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* <!-- END SIGN UP -->
			<!-- SIGN IN --> */}
        <div className="home-col home-align-items-center home-flex-col home-sign-in">
          <div className="home-form-wrapper home-align-items-center">
            <div className="home-form home-sign-in">
              <form method="post">
                <div className="home-input-group">
                  <input
                    type="text"
                    onChange={loginuserNameChangeHandler}
                    value={loginuserName}
                    placeholder="Username"
                  />
                </div>
                <div className="home-input-group">
                  <input
                    type="password"
                    onChange={loginpassWordChangeHandler}
                    value={loginpassWord}
                    placeholder="Password"
                  />
                </div>
              </form>

              <button onClick={loginsubmitHandler}>Sign in</button>
              <p>
                <b style={{cursor:"pointer"}}
                  onClick={() => {
                    Navigate("/forgotPassWord");
                  }}
                >
                  Forgot password?
                </b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggle} className="home-pointer">
                  Sign up here
                </b>
              </p>
            </div>
          </div>
          <div className="home-form-wrapper"></div>
        </div>
        {/* <!-- END SIGN IN --> */}
      </div>
      {/* <!-- END FORM SECTION -->
		<!-- CONTENT SECTION --> */}
      <div className="home-row home-content-row">
        {/* <!-- SIGN IN CONTENT --> */}
        <div className="home-col home-align-items-center home-flex-col">
          <div className="home-text home-sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="home-img home-sign-in"></div>
        </div>
        {/* <!-- END SIGN IN CONTENT -->
			<!-- SIGN UP CONTENT --> */}
        <div className="home-col home-align-items-center home-flex-col">
          <div className="home-img home-sign-up"></div>
          <div className="home-text home-sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
        {/* <!-- END SIGN UP CONTENT --> */}
      </div>
      {/* <!-- END CONTENT SECTION --> */}
    </div>
  );
};

export default HomePage;
