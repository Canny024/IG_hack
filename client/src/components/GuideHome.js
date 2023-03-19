import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export default function GuideHome() {
  const [currGuideData, setCurrGuideData] = useState({});
  const currUserName = localStorage.getItem("userName");
  const [requested, setRequested] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:4000/requestCheckData", {
        params: { currUserName: currUserName },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data[0].incomingReq === "yes") {
          setRequested(true);
        } else {
          setRequested(false);
        }
        setCurrGuideData(response.data);
      });
  }, []);

  const acceptHandler = () => {
    axios.get("http://localhost:4000/accept", {
      params: { currUserName: currUserName },
    });
    window.location.reload(false);

  };
  const rejectHandler = () => {
    axios.get("http://localhost:4000/reject", {
      params: { currUserName: currUserName },
    });
    window.location.reload(false);

  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {requested && (
          <div
            style={{
              display: "grid",
              gridAutoColumns: "1fr 1fr ",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 style={{ marginTop: "60px", width: "100%" }}>
              You have a booking Request
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  border: "0",
                  padding: "10px",
                  width: "100%",
                  borderRadius: "3px",
                  background: "#e40046",
                  color: "#fff",
                  fontFamily: "Bree Serif",
                  fontSize: "1rem",
                  margin: "5px 2px",
                  cursor: "pointer",
                  outline: "none",
                  marginBottom: "10px",
                  transition: "background 0.3s ease-in-out",
                  boxShadow: "0px 5px 7px 0px rgba(0, 0, 0, 0.3)",
                }}
                onClick={acceptHandler}
              >
                Accept
              </button>
              <button
                style={{
                  border: "0",
                  padding: "10px",
                  width: "100%",
                  borderRadius: "3px",
                  background: "#e40046",
                  color: "#fff",
                  fontFamily: "Bree Serif",
                  fontSize: "1rem",
                  margin: "5px 2px",
                  cursor: "pointer",
                  outline: "none",
                  marginBottom: "10px",
                  transition: "background 0.3s ease-in-out",
                  boxShadow: "0px 5px 7px 0px rgba(0, 0, 0, 0.3)",
                }}
                onClick={rejectHandler}
              >
                Reject
              </button>
            </div>
          </div>
        )}
        {!requested && <h1 style={{ marginTop: "60px" }}>No Requests Yet</h1>}
      </div>
    </>
  );
}
