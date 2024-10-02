const student = require("./student");
async function isvalid(username,password,confirm_password)
{
    if(!username || username.length !== 10)
    {
        return {isValid : false,message : "Length of username is not valid"};
    }
    const existing = await student.findOne({ username });
    if(existing)
    {
        return {isValid : false,message : "Username Already exists"};
    }
    if(password !== confirm_password)
    {
        return {isValid : false, message : "Both passwords should be same"}
    }
    return {isValid : true,message : ""};
}
module.exports={isvalid}