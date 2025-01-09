const express = require('express');
const User = require('../userSchema');
const app = express();

require('../db/conn');

const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello world from the server router js");
});

router.use(express.json()); // parsing the json data
router.post("/signup", async(req, res) => {
  console.log(req.body);
  // res.json({ message: req.body });
  const { name, email, phone, password, ConfirmPassword } = req.body;
  console.log(name);
  console.log(email);
  if (!name || !email || !phone || !password || !ConfirmPassword) {
    return res.status(422).json({ error: "Please fill the field properly" });
  }
  
  await User.insertOne(name,email,phone,password,ConfirmPassword);

  await User.findOne({ email: email })
    .then((userExits) => {
      if (userExits) {
        return res.status(422).json({ error: "Email is already exists" });
      }

      const user = new User({ name:name, email:email, phone:phone, password:password, ConfirmPassword:ConfirmPassword });
      user.save().then(() => {
        res.status(201).json({ message: "user registered successfully" })
      }).catch((err) => {
        res.status(500).json({ message: "failed to registerd" })
      })
    }).catch(err => console.log(err));
});

// login route

router.post('/login',(req,res)=>{
    console.log(req.body)
})

module.exports = router;