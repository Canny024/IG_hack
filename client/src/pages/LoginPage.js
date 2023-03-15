import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../Assets/Styles/loginpage.module.css";

const LoginPage = () => {
  const Navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  localStorage.setItem("RoomKey", "JDKVELDNPgf6CbmdAAAL");
  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  const passWordChangeHandler = (e) => {
    setPassWord(e.target.value);
  };
  const submitHandler = async (e) => {
    // e.preventDefault();
    let loginData = {
      userName: userName,
      passWord: passWord,
    };
    // console.log(loginData);
    const res = await axios({
      method: "post",
      url: "http://localhost:4000/loginData",
      data: {
        userName: userName,
        passWord: passWord,
      },
    });
    // console.log(res)
    const userType = res.data;
    console.log(userType);
    localStorage.setItem("userName", userName);
    Navigate(`/${userType}Page`);
  };
  useEffect(() => {
    submitHandler();
  }, []);
  return (
    <>
      <body>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={classes.left}>
            <div className={classes["top_link"]}>
              <a href="/signUpPage">
                <img
                  src="https://drive.google.com/u/0/uc?id=16U__U5dJdaTfNGobB_OpwAJ73vM50rPV&export=download"
                  alt=""
                />
                Back to SignUp
              </a>
            </div>
            <div className={classes.contact}>
              <form action="">
                <h3 style={{ color: "black" }}>LOGIN</h3>
                <input
                  type="text"
                  placeholder="USERNAME"
                  onChange={userNameChangeHandler}
                  value={userName}
                />
                <input
                  type="text"
                  placeholder="PASSWORD"
                  onChange={passWordChangeHandler}
                  value={passWord}
                />
              </form>
              <button className={classes.submit} onClick={submitHandler}>
                LET'S GO
              </button>
              <button
                className={classes.submit}
                onClick={() => {
                  Navigate("/forgotPassWord");
                }}
              >
                Forgot PassWord?
              </button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default LoginPage;
