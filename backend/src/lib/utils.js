import jwt from "jsonwebtoken"

export const generateToken = (userId,res) =>{
    // userId : userId but no need to write all you know 
    // to get userid just decode it and use decodedOne.userId
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn : "7d"
    });

    // set in the cookie of response that call this function

    res.cookie("jwt",token,{
        maxAge : 7*24*60*60*1000 , // seven days in milisecond
        httpOnly : true, //preven xss attack , cross-site scripting attack
        sameSite : "strict" , // csrf attack 
        secure : process.env.NODE_ENV != "development" ,
    });

    return token;
}