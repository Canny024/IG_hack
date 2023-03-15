const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const User = require("./signUpDataSchema");
const GuideUser = require("./guideFullDataSchema");

mongoose.connect(
  "mongodb+srv://aniket1:hianiket123@cluster0.z69mafx.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.post("/loginData", async (req, res) => {
  //   console.log(req.body);
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  const exData = await User.find({ userName: userName, passWord: passWord });
  if (exData.length != 0) {
    const presentUser=await User.find({ userName: userName});
    const presentUserType=presentUser[0].userType;
    console.log(presentUserType);
    res.send(presentUserType);
    console.log("logged in");
  } else {
    console.log("Wrong credentials");
  }
});
app.post("/signUpData", async (req, res) => {
    console.log(req.body);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  const userType = req.body.userType;
  const formData = new User({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    passWord: passWord,
    userType: userType
  });
  try {
    await formData.save();
    console.log("data inserted");
    // console.log("duplicate found")
  } catch (err) {
    console.log(err)
  }
});

app.post("/guideFullData", async (req, res) => {
  //   console.log(req.body);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const languages = req.body.languages;
  const availaibility= req.body.availaibility;
  const qualifications= req.body.qualifications;
  const experience= req.body.experience;
  const phNo= req.body.phNo;
  const email= req.body.email;
  const location= req.body.location;
  const price=req.body.price;
  const rating=req.body.rating;
  const accountNo=req.body.accountNo;
  const incomingReq="no";
  const outgoingReq="no";

  const formData = new GuideUser({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    languages: languages,
    availaibility: availaibility,
    qualifications: qualifications,
    experience: experience,
    phNo: phNo,
    email: email,
    location:location,
    price:price,
    rating:rating,
    accountNo:accountNo,
    incomingReq:incomingReq,
    outgoingReq:outgoingReq
  });
  try {
    await formData.save();
    console.log("data inserted");
    // console.log("duplicate found")
  } catch (err) {}
});

app.get("/getGuideData", async(req,res)=>{
    const currUserName=req.query.currUserName;
    const currGuideData=await User.find({userName:currUserName});
    // console.log(currGuideData);
    res.send(currGuideData)
})

app.get("/touristPage", async(req,res)=>{
  const allGuideData=await GuideUser.find();
  // console.log(allGuideData);??????????????
  res.send(allGuideData);
})

app.post("/newPassWordData",async (req, res)=>{
  const userName=req.body.userName;
  const newPassWord=req.body.passWord
  const filter = { userName: userName };
  const update = { passWord: newPassWord };
  let doc = await User.findOneAndUpdate(filter, update, {
    new: true
  });
  res.send("Password Updated")
})

app.get("/request", async(req,res)=>{
  const currUserName=req.query.currUserName;
  // const currGuideData=await GuideUser.find({userName:currUserName});
  const filter = { userName: currUserName };
const update = { incomingReq:"yes" }

// `doc` is the document _after_ `update` was applied because of
// `new: true`
let doc = await GuideUser.findOneAndUpdate(filter, update, {
  new: true
});


})

app.get("/requestCheckData", async(req,res)=>{
  const currUserName=req.query.currUserName;
  const currGuideData=await GuideUser.find({userName:currUserName});
  res.send(currGuideData);
})

app.get("/accept", async(req,res)=>{
  const currUserName=req.query.currUserName;
  // const currGuideData=await GuideUser.find({userName:currUserName});
  const filter = { userName: currUserName };
const update = { incomingReq:"no" , outgoingReq:"yes"}

// `doc` is the document _after_ `update` was applied because of
// `new: true`
let doc = await GuideUser.findOneAndUpdate(filter, update, {
  new: true
});
})
app.get("/reject", async(req,res)=>{
  const currUserName=req.query.currUserName;
  // const currGuideData=await GuideUser.find({userName:currUserName});
  const filter = { userName: currUserName };
const update = { incomingReq:"no" ,outgoingReq:"no"}

// `doc` is the document _after_ `update` was applied because of
// `new: true`
let doc = await GuideUser.findOneAndUpdate(filter, update, {
  new: true
});
})


const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
