import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const TouristPage = () => {
  const Navigate = useNavigate();
  
  const [allGuideData, setAllGuideData] = useState([]);
  const [currLoggedUser,setCurrLoggedUser] =useState("");
  const [sortBy,setSortBy]=useState("None");
  const [type,setType]=useState("");
  // console.log(currLoggedUser)
  useEffect(() => {
    axios.get("http://localhost:4000/touristPage").then((response) => {
      const allGData=response.data;
      const guideData=allGData.filter((person)=>{
        return person.userType==="Guide"
      })
      setAllGuideData(guideData);
    });
    setCurrLoggedUser(localStorage.getItem("userName"));
  }, []);
  const options = [
    'None','Languages', 'Location'
  ];
  
  const dropdownChangeHandler =(e)=>{
    setSortBy(e.value)
  }
  const typeChangeHandler=(e)=>{
    setType(e.target.value);
  }
  let filteredData=[]
  if(sortBy!=="None"){
     filteredData=allGuideData.filter((data)=>{
      const sorte=sortBy.toLowerCase();
      const first=data[sorte].toUpperCase();
      const second=type.toUpperCase();
      return first===second;
    })
  }
  else{
   filteredData=allGuideData
  }
  const logoutHandler=()=>{
    localStorage.removeItem('userName');
    Navigate('/');

  }
  
  
  return (
    <div>
      <h1 style={{textAlign:"center", margin:"30px", fontSize:"50px",color:"black", fontWeight:"800"}}>Tourist Page</h1>
      <button onClick={logoutHandler}>Logout</button>
      <div style={{display:"flex", justifyContent:"center", margin:"20px" }}><Dropdown options={options} value={sortBy} onChange={dropdownChangeHandler}   placeholder="Sort By" />
      <input style={{width:"30%", height:"35px"}} type="text" placeholder="Search For" value={type} onChange={typeChangeHandler} />
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-evenly" , flexWrap:"wrap" }}>
        {
          
          
          filteredData.map((data) => {
          return (
            <Card
            key={data.id}
            currGuideUsername={data.userName}
            firstName={data.firstName}
            lastName={data.lastName}
            languages={data.languages}
            availability={data.availaibility}
            qualifications={data.qualifications}
            experience={data.experience}
            phNo={data.phNo}
            email={data.email}
            location={data.location}
            price={data.price}
            rating={data.rating}
          />
          )

        })}
      </div>
    </div>
  );
};

export default TouristPage;