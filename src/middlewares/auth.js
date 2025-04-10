const jwt = require("jsonwebtoken");
const Usermodel = require("../models/user");





const userAuth= async(req,res,next)=>{
  //read the token from the req cookies
  try{ 
    const {token}=req.cookies;

    if(!token){
         return res.status(401).send("Please login");
    }
  const decodedObj = await jwt.verify(token,process.env.JWT_SECRET_KEY);
  const{_id}=decodedObj;
  const user = await Usermodel.findById(_id);
  if(!user)
  {
     throw new Error("user not found");
  }

  req.user=user;
  next();
}catch(err)
{
    res.status(400).send("Error:"+err.message);  
}
  //validate the user
  //find the user from the database
};

module.exports ={userAuth};