import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Assets/Styles/guide.css";

export default function Form() {

  const [guideData,setGuideData]= useState({});
  const currUserName = localStorage.getItem("userName");
  useEffect(() => {
    axios
      .get("http://localhost:4000/getGuideFullData", {
        params: { currUserName: currUserName },
      })
      .then((response) => {
        setGuideData(response.data[0]);
      });
    
  }, []);

      const c1Handler = (e) => {
        setGuideData({ ...guideData, email: e.target.value });
      };
      const c2Handler = (e) => {
        setGuideData({ ...guideData, phNo: e.target.value });
      };
      const c3Handler = (e) => {
        setGuideData({ ...guideData, city: e.target.value });
      };
      const c4Handler = (e) => {
        setGuideData({ ...guideData, country: e.target.value });
      };
      const c5Handler=(e)=>{
        setGuideData({...guideData, languages:e.target.value})
      }
      const c6Handler = (e) => {
        setGuideData({ ...guideData, price: e.target.value });
      };
      const c7Handler = (e) => {
        setGuideData({ ...guideData, qualifications: e.target.value });
      };
      const c8Handler = (e) => {
        setGuideData({ ...guideData, experience: e.target.value });
      };
      const c9Handler=(e)=>{
        setGuideData({...guideData, about:e.target.value})
      }
      
      
  const saveHandler = async() => {
    console.log(guideData);
    window.location.reload(false);
    await axios.post("http://localhost:4000/guideFullData", guideData);
    
  };
     
  return (

    <div id="edit" class="col-xl-8 order-xl-1">
              <div class="card bg-secondary shadow">
                <div class="card-header bg-white border-0">
                  <div class="row align-items-center">
                    <div class="col-8">
                      <h3 class="mb-0">My account</h3>
                    </div>
                    <div class="col-4 text-right">
                      <a style={{color:"white"}} onClick={saveHandler}  class="btn btn-sm btn-primary">
                        Save Changes
                      </a>
                    </div>
                  </div>
                </div>
                <div class="card-body">
      <form>
        <h6 class="heading-small text-muted mb-4">User information</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-md-12">
              <div class="form-group focused">
                <label class="form-control-label" for="input-username">
                  Username
                </label>
                <input
                  type="text"
                  id="input-username"
                  class="form-control form-control-alternative"
                  placeholder="Username"
                  value={guideData.userName}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group focused">
                <label class="form-control-label" for="input-first-name">
                  First name
                </label>
                <input
                  type="text"
                  id="input-first-name"
                  class="form-control form-control-alternative"
                  placeholder="First name"
                  value={guideData.firstName}
                  readOnly={true}
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group focused">
                <label class="form-control-label" for="input-last-name">
                  Last name
                </label>
                <input
                  type="text"
                  id="input-last-name"
                  class="form-control form-control-alternative"
                  placeholder="Last name"
                  value={guideData.lastName}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group focused">
                <label class="form-control-label" for="input-first-name">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control form-control-alternative"
                  placeholder="jesse@example.com"
                  onChange={c1Handler}
                  value={guideData.email || ""}
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group focused">
                <label class="form-control-label" for="input-last-name">
                  Phone No.
                </label>
                <input
                  type="text"
                  class="form-control form-control-alternative"
                  placeholder="Your Phone Number"
                  onChange={c2Handler}
                  value={guideData.phNo || ""}
                />
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4" />
        {/* <!-- Address --> */}
        <h6 class="heading-small text-muted mb-4">General information</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group focused">
                <label class="form-control-label" for="input-city">
                  City
                </label>
                <input
                  type="text"
                  id="input-city"
                  class="form-control form-control-alternative"
                  placeholder="City"
                  onChange={c3Handler}
                  value={guideData.city || ""}
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group focused">
                <label class="form-control-label" for="input-country">
                  Country
                </label>
                <input
                  type="text"
                  id="input-country"
                  class="form-control form-control-alternative"
                  placeholder="Country"
                  onChange={c4Handler}
                  value={guideData.country || ""}
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group focused">
                <label class="form-control-label" for="input-city">
                  Language
                </label>
                <input
                  type="text"
                  id="input-city"
                  class="form-control form-control-alternative"
                  placeholder="Language"
                  onChange={c5Handler}
                  value={guideData.languages || ""}
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group focused">
                <label class="form-control-label" for="input-country">
                  Price
                </label>
                <input
                  type="text"
                  class="form-control form-control-alternative"
                  placeholder="Price in $"
                  onChange={c6Handler}
                  value={guideData.price || ""}
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group focused">
                <label class="form-control-label" for="input-city">
                  Qualification
                </label>
                <input
                  type="text"
                  class="form-control form-control-alternative"
                  placeholder="Qualifications"
                  onChange={c7Handler}
                  value={guideData.qualifications || ""}
                />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group focused">
                <label
                  class="form-control-label"
                  
                >
                  Experience
                </label>
                <input
                  type="text"
                  id="input-country"
                  class="form-control form-control-alternative"
                  placeholder="Experience In years"
                  onChange={c8Handler}
                  value={guideData.experience || ""}
                />
              </div>
            </div>
          </div>
        </div>
        <hr class="my-4" />
        {/* <!-- Description --> */}
        <h6 class="heading-small text-muted mb-4">About Me</h6>
        <div class="pl-lg-4">
          <div class="form-group focused">
            <label>About Me</label>
            <textarea
              rows="4"
              class="form-control form-control-alternative"
              placeholder="A few words about you ..."
              onChange={c9Handler}
              value={guideData.about || ""}
            >
              A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.
            </textarea>
          </div>
        </div>
      </form>
    </div>
              </div>
            </div>
    
  );
}
