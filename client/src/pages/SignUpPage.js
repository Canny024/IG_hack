import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import classes from '../Assets/Styles/signupPage.module.css'

const SignUpPage = () => {
  const Navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [userType, setUserType] = useState("");
  const [rd1,setRd1]= useState(false);
  const [rd2,setRd2]= useState(false);
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
    console.log(signUpData)
    Navigate("/loginPage");
    await axios.post("http://localhost:4000/signUpData", signUpData);
  };
  const options = [
    'Guide', 'Tourist'
  ];

  const GotoLoginHandler=()=>{
    Navigate("/loginPage");
  }
  const dropdownChangeHandler=(e)=>{
      setUserType(e.value);
  }


  return (

    <>

<div className={classes["form_wrapper"]} >
  <div className={classes["form_container"]} >
    <div className={classes["title_container"]} >
      <h2>Responsive Registration Form</h2>
    </div>
    <div className={`${classes["row"]} ${classes["clearfix"]}`}>
      <div class="">
        <form method="post">
          <div className={classes["input_field"]} > <span><i aria-hidden="true" class="fa fa-envelope"></i></span>
            <input type="email" name="email" placeholder="Username" required onChange={userNameChangeHandler} value={userName} />
          </div>
          <div className={classes["input_field"]}> <span><i aria-hidden="true" class="fa fa-lock"></i></span>
            <input type="password" name="password" placeholder="Password" required onChange={passWordChangeHandler} value={passWord} />
          </div>
          <div className={classes["input_field"]}> <span><i aria-hidden="true" class="fa fa-lock"></i></span>
            <input type="password" name="password" placeholder="Re-type Password" required />
          </div>
          <div className={`${classes["row"]} ${classes["clearfix"]}`}>
            <div className={classes["col_half"]} >
              <div className={classes["input_field"]}> <span><i aria-hidden="true" class="fa fa-user"></i></span>
                <input type="text" name="name" placeholder="First Name" onChange={firstNameChangeHandler}
          value={firstName} />
              </div>
            </div>
            <div className={classes["col_half"]}>
              <div className={classes["input_field"]}> <span><i aria-hidden="true" class="fa fa-user"></i></span>
                <input type="text" name="name" placeholder="Last Name" required onChange={lastNameChangeHandler} value={lastName} />
              </div>
            </div>
          </div>
            	{/* <div className={`${classes["input_field"]} ${classes["radio_option"]}`} >
              <input type="radio" name="radiogroup1" id="rd1" onChange={rd1ChangeHandler} />
              <label for="rd1">Guide</label>
              <input type="radio" name="radiogroup1" id="rd2" onChange={rd2ChangeHandler} />
              <label for="rd2">Tourist</label>
              </div>       */}
              <Dropdown options={options} value={userType} onChange={dropdownChangeHandler}   placeholder="You are?" />;
              
        </form>
        <button className={classes.button} onClick={submitHandler}>Sign/Up</button>
        <div style={{color:"black" , textAlign:"center" , marginBottom:"6px", fontSize:"15px"}}>or</div>
        <button className={classes.button} onClick={GotoLoginHandler}>Login</button>
      </div>
    </div>
  </div>
</div>











{/* 
      <div>
      <form action="" method="post">
        <label htmlFor="">FirstName</label>
        <input
          type="text"
          onChange={firstNameChangeHandler}
          value={firstName}
        />
        <label htmlFor="">LastName</label>
        <input type="text" onChange={lastNameChangeHandler} value={lastName} />
        <label htmlFor="">UserName</label>
        <input type="text" onChange={userNameChangeHandler} value={userName} />
        <label htmlFor="">PassWord</label>
        <input type="text" onChange={passWordChangeHandler} value={passWord} />
        <label >UserType</label>
        <input label="user" value={userType} onChange={userTypeChangeHandler} />
      </form>
      <button className={classes.button} onClick={submitHandler}>Sign/Up</button>
    </div> */}
    </>
    
  );
};

export default SignUpPage;
