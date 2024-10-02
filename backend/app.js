const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./models/db");
const {isvalid} = require("./models/validator");
require("./")
const student = require("./models/student");
const bcrypt = require("bcrypt");
const app = express();
// sending request to postman or any other may be gives error we need to express .json to convert into json file
app.use(express.json());
// this function down runs everytime request is made as path is not mentioned
app.use((req,res,next)=>{
  next();
})
app.listen(5000, function () {
  console.log("Listening on port 5000");
});

app.get('/signup',async (req,res)=>{
     let username = req.body.username;
     const password = req.body.password;
     const confirm_password = req.body.confirm_password;
     username = username.trim();
     const a = await isvalid(username,password,confirm_password);
     if(a.isValid)
     {
          const st = await new student({
            username: username,
            password: password,
          });
          st.save();   
          res.send("CREATED");
          return ;
     }
     else{ 
       res.send(a.message);
       return ;
      }
})

app.get('/login',async(req,res)=>{
  let {username,password } = req.body;
  username = username.trim();
  if(!username){res.send("Username is required");return;}
  if(!password){ res.send("Password is required");return;}
  const user =await  student.findOne({username});
  if(!user){
    res.send("No such user exist");
    return ;
  }
  const auth = await bcrypt.compare(password, user.password);
  if(auth)
  {
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
       expiresIn: "1d",
     });

     res.json({ success: true, token });
    return ;
  }
  else{
    res.send("Wrong Password");
  }
})
