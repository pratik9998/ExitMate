const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./models/db");
const {isvalid} = require("./models/validator");
require("./")
const student = require("./models/student");
const bcrypt = require("bcrypt");
const app = express();
const cors = require("cors");
const sdmail = require("./middleware/sendemail");
const outToken = require("./models/outToken");
app.use(cors());
// sending request to postman or any other may be gives error we need to express .json to convert into json file
app.use(express.json());

// this function down runs everytime request is made as path is not mentioned
app.use((req,res,next)=>{
  next();
})

app.listen(5000, function () {
  console.log("Listening on port 5000");
});

app.post('/create',async(req,res)=>{
    try{
         let username = req.body.username;
     const password = req.body.password;
     username = username.trim();
     username = username.toLowerCase();     
     const st = await new student({
       username: username,
       password: password,
     });
    st.save(); 
    // Send a success response
    res.status(200).send({ message: 'User created successfully!' , user:st});
    }catch(err)
    {
      console.log(err);
    }
})
app.post('/getuser',async(req,res)=>{
   // 
})
app.post('/getdata',async(req,res)=>{
   try{
    let username = req.body.username;
    let out = student.findOne({username});
    let data = (await out.populate("outTokens")).outTokens;
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let a = [];
    for(const item of data){
    
    }
    return res.send({ success: true });
   }catch(err)
   {
    console.log(err);
    return res.send({success : false});
   }
})
app.post('/signup',async (req,res)=>{
     let username = req.body.username;
     const password = req.body.password;
     const confirm_password = req.body.confirmPassword;
     username = username.trim();
     username = username.toLowerCase();
     const a = await isvalid(username,password,confirm_password);
     if(a.isValid)
     {
          const email = username + "@iiita.ac.in";
          const result = await sdmail(email);
          if(result.success == false)
          {
            const message = "Error Sending the OTP";
             return res.send({success : false,message});
          }
          const message = "Verify";
          res.send({success : true , message  ,otp : result.otp});
          return ;
     }
     else{ 
       res.send({success : false , message :a.message});
       return ;
      }
})
app.post('/outgoingrequest' , async(req,res)=>{
     try{
        let username = req.body.username;
        let image = req.body.image;
        username = username.trim();
        username = username.toLowerCase();
        const out = await new outToken({
          outDate: await new Date(),
          outImage : image
        })
        out.save();
        await student.updateOne(
          { username : username }, 
          { 
            $push: { outTokens : out } ,
            $set :{inHostel : false}
          }, 
        );
        res.send({success:true});
     }   
     catch(err)
     {
        console.log(err);
        res.send({success:false , message : "Error sending outgoing request"});
     }   
})
app.post('/incomingrequest',async(req,res)=>{    
  try{
      let username = req.body.username;
      let image = req.body.image;
    let out =await student.findOne({username});
    const tokenNumber = out.outTokens[out.outTokens.length - 1];
    const token = await outToken.findById(tokenNumber);
    if(token.active==0)
    {
      return res.send({success: false , message : "Invalid Request"});
    }
    token.inDate = await new Date();
    token.active = 0;
    token.save();
     await student.updateOne(
       { username: username }, // Filter by class ID
       { $set: { inHostel: true  , inImage : image} }
     );
    return res.send({success : true});
  }
  catch(err)
  {
    console.log(err);
    return res.send({success : false,message : "Error sending income request"});
  }
})
app.post('/login',async(req,res)=>{
  let {username,password } = req.body.params;
  username = username.trim();
  username = username.toLowerCase();
  if(!username){res.send({success:false,message:"Username is required"});return;}
  if(!password){ res.send({success:false,message:"Password is required"});return;}
  const user =await  student.findOne({username});
  if(!user){
    res.send({success:false,message:"No such user exist"});
    return ;
  }
  const auth = await bcrypt.compare(password, user.password);
  if(auth)
  {
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
       expiresIn: "1d",
     });

     res.json({ success: true, user, token });
    return ;
  }
  else{
    res.send({success:false,message:"Wrong Password"});
  }
})

app.post('/sendmail' ,async (req,res)=>{
  try {
    console.log(req.body.userEmail)
    const result = await sdmail(req.body.userEmail);
    // console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});
app.post("/checkuserexists",async(req,res)=>{
  let username = req.body.username;
  username=username.trim();
  username=username.toLowerCase();
  const user = await student.findOne({username});
  if(user) return res.send({exists : true});
  else return res.send({exists : false});
});
app.post("/changepassword",async (req,res)=>{
  try{
    let username = req.body.username;
    const password = req.body.newPassword;
    username=username.trim();
    username=username.toLowerCase();
    // console.log(username);
    const user = await student.findOne({ username });
    user.password = password;
    // console.log(st)
    user.save();
    res.send({success : true});
  }catch(err)
  {
    console.log(err);
    return res.send({success : false});
  }

}); 

