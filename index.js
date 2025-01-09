const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const UserModel = require("./models/users");
const bcrypt = require("bcryptjs");
const setupProductRoutes = require("./allProducts");
const { setupUserProductRoutes } = require("./userProducts");
const fishTankRoute = require('./fishTankProducts');

require("dotenv").config();
app.use(cors());

const userURI = process.env.DATABASE;

app.use(express.json());

// console.log(userURI);
mongoose
.connect(userURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

setupProductRoutes(app);
setupUserProductRoutes(app);

app.use('/api',fishTankRoute);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Please fill in all the fields");
    }

    const userLogin = await UserModel.findOne({ email: email });

    if (userLogin && bcrypt.compareSync(password, userLogin.password)) {
      return res.status(200).json({
        status : "success",
        name: userLogin.name
      });
    } else {
      return res.status(400).json("failed");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("Internal Server Error");
  }
});

let isLoggedIn = false;
app.get("/login", async(req,res) => {
  const {name} = req.body;
  const userName = await UserModel.findOne({
    _id,
    name,
  })
  return res.status(200).json(userName);
})

app.post("/signups", async (req, res) => {
  try {
    const { name, email, phone, password, ConfirmPassword } = req.body;

    if (!name || !email || !phone || !password || !ConfirmPassword) {
      return res.status(422).json("Please fill in all the fields properly");
    }

    const userExist = await UserModel.findOne({
      name,
      email,
      phone,
      password,
      ConfirmPassword,
    });

    if (userExist) {
      return res.status(422).json("User already exists");
    }

    const user = new UserModel({
      name,
      email,
      phone,
      password,
      ConfirmPassword,
    });
    await user.save();
    res.status(201).json("User registered successfully");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json("Internal Server Error");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json("Internal Server Error");
  }
});

app.get("users:_id", async (req,res) => {
  try{
    const user = await UserModel.find({_id});
    res.status(200).json(user);
  }catch(error){

  }
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
