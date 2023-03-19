import axios from "axios";
import React, { useState, useEffect } from "react";
import classes from "../Assets/Styles/card.module.css";
import GooglePayBtn from "./GooglePayBtn";

export default function Card(props) {
  const [isAccepted, setIsAccepted] = useState(false);

  const requestHandler = async () => {
    window.location.reload(false);
    await axios.get("http://localhost:4000/request", {
      params: { currUserName: props.currGuideUsername },
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/requestCheckData", {
        params: { currUserName: props.currGuideUsername },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data[0].outgoingReq === "yes") {
          setIsAccepted(true);
        } else {
          setIsAccepted(false);
        }
      });
  }, []);

  return (
    <div id={classes["login-container"]}>
      <div className={classes["profile-img"]}></div>
      <h1>{`${props.firstName} ${props.lastName}`}</h1>
      <div className={classes["description"]}>
        Maddie is a front end web developer in New York. She has worked in the
        field for 10 years now. Check out her projects in the links below. She
        is available for hire as well.
      </div>
      <div className={classes["social"]}>
        <a style={{ textDecoration: "none" }} href="/chatPage">
          Chat
        </a>
        <a>{`${props.rating}`}</a>
        <a style={{ cursor: "default" }}>{`$${props.price}`}</a>
        <a style={{ cursor: "default" }}>{`${props.location}`}</a>
      </div>
      {isAccepted && (
        <GooglePayBtn merchantId={props.accountNo} price={props.price} />
      )}
      {!isAccepted && <button onClick={requestHandler}>Request</button>}
    </div>
  );
}
