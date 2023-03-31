const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const User = require("./signUpDataSchema");
const GuideUser = require("./guideFullDataSchema");
const multer = require("multer");
const bcrypt = require("bcryptjs");

mongoose.connect(
  "mongodb+srv://aniket1:hianiket123@cluster0.z69mafx.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

//multer storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

app.post("/loginData", async (req, res) => {
  //   console.log(req.body);
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  // const user = await GuideUser.find({
  //   userName: userName
  //   // passWord: passWord,
  // });
  // if (exData.length != 0) {
  //   const presentUser = await GuideUser.find({ userName: userName });
  //   const presentUserType = presentUser[0].userType;
  //   console.log(presentUserType);
  //   res.send(presentUserType);
  //   console.log("logged in");
  // } else {
  //   res.send("wrong Credentials")
  //   console.log("Wrong credentials");
  // }
  const user = await GuideUser.findOne({
    userName: userName,
  });
  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(passWord, user.passWord);
  //login successful
  if (isPasswordValid) {
    const presentUserType = user.userType;
    // console.log(presentUserType);
    res.send(presentUserType);
    console.log("logged in");
  }
  //login failed
  else {
    res.send("wrong Credentials");
    console.log("Wrong credentials");
  }
});
app.post("/signUpData", async (req, res) => {
  // console.log(req.body);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  const userType = req.body.userType;
  const newPassword = await bcrypt.hash(passWord, 10);
  const formData = new GuideUser({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    passWord: newPassword,
    userType: userType,
  });
  try {
    await formData.save();
    console.log("data inserted");
    res.send("OK");
    // console.log("duplicate found")
  } catch (err) {
    console.log(err);
    res.send("userName already exist");
  }
});

app.post("/guideFullData", async (req, res) => {
  const update = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    languages: req.body.languages,
    qualifications: req.body.qualifications,
    experience: req.body.experience,
    phNo: req.body.phNo,
    email: req.body.email,
    location: req.body.location,
    price: req.body.price,
    rating: req.body.rating,
    accountNo: req.body.accountNo,
    incomingReq: "no",
    outgoingReq: "no",
    image: {
      data: req.file.filename,
      contentType: "image/png",
    },
  };
  const filter = { userName: req.body.userName };
  let doc = await GuideUser.findOneAndUpdate(filter, update, {
    new: true,
  });
});

// app.get("/getGuideData", async(req,res)=>{
//     const currUserName=req.query.currUserName;
//     const currGuideData=await User.find({userName:currUserName});
//     // console.log(currGuideData);
//     res.send(currGuideData)
// })

app.get("/touristPage", async (req, res) => {
  if(req.query.currUserName.length>0 && req.query.currUserName!=="/0"){
    const allGuideData = await GuideUser.find();
    res.send(allGuideData);
  }
  else{
    res.send("Logged out")
  }
});

app.post("/newPassWordData", async (req, res) => {
  const userName = req.body.userName;
  const newPassWord = req.body.passWord;
  const filter = { userName: userName };
  const update = { passWord: newPassWord };
  let doc = await GuideUser.findOneAndUpdate(filter, update, {
    new: true,
  });
  res.send("Password Updated");
});

app.get("/request", async (req, res) => {
  const currUserName = req.query.currUserName;
  // const currGuideData=await GuideUser.find({userName:currUserName});
  const filter = { userName: currUserName };
  const update = { incomingReq: "yes" };

  // `doc` is the document _after_ `update` was applied because of
  // `new: true`
  let doc = await GuideUser.findOneAndUpdate(filter, update, {
    new: true,
  });
});

app.get("/requestCheckData", async (req, res) => {
  const currUserName = req.query.currUserName;
  let currGuideData = await GuideUser.find({ userName: currUserName });
  if (currGuideData.length === 0) {
    currGuideData = await User.find({ userName: currUserName });
  }
  // console.log(currGuideData);
  res.send(currGuideData);
});

app.get("/accept", async (req, res) => {
  const currUserName = req.query.currUserName;
  // const currGuideData=await GuideUser.find({userName:currUserName});
  const filter = { userName: currUserName };
  const update = { incomingReq: "no", outgoingReq: "yes" };

  // `doc` is the document _after_ `update` was applied because of
  // `new: true`
  let doc = await GuideUser.findOneAndUpdate(filter, update, {
    new: true,
  });
});
app.get("/reject", async (req, res) => {
  const currUserName = req.query.currUserName;
  // const currGuideData=await GuideUser.find({userName:currUserName});
  const filter = { userName: currUserName };
  const update = { incomingReq: "no", outgoingReq: "no" };

  // `doc` is the document _after_ `update` was applied because of
  // `new: true`
  let doc = await GuideUser.findOneAndUpdate(filter, update, {
    new: true,
  });
});

app.get("/availability", async (req, res) => {
  const currUserName = req.query.currUserName;
  const currGuideData = await GuideUser.find({ userName: currUserName });
  const currAvailability = currGuideData[0].availaibility;
  const filter = { userName: currUserName };
  let update = {};
  if (currAvailability) update = { availaibility: false };
  else {
    update = { availaibility: true };
  }
  let doc = await GuideUser.findOneAndUpdate(filter, update, {
    new: true,
  });
});

app.get("/getGuideFullData", async (req, res) => {
  const currUserName = req.query.currUserName;
  // console.log(currUserName)
  const currGuideData = await GuideUser.find({ userName: currUserName });
  res.send(currGuideData);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
