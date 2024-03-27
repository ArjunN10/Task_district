const userSchema=require("../models/UserSchema")
const DistrictSchema=require("../models/DistrictSchema")
const { joiUserSchema } = require("../models/ValidationSchema")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

module.exports={

// <-------------------->Register Section<----------------->

    UserRegister: async (req, res) => {
        const { value, error } = joiUserSchema.validate(req.body);
    
        if (error) {
            return res.status(403).json({
                error: "Validation error",
                message: error.details[0].message
            });
        }
    
        try {
            const {
                name,
                email,
                password,
                phoneNumber,
                date_of_birth,
                assembly,
                constituency,
                district,
                panchayath,
                municipality,
                corporation
            } = value;
    
            await userSchema.create({
                name,
                email,
                password,
                phoneNumber,
                date_of_birth,
                assembly,
                constituency,
                district,
                panchayath,
                municipality,
                corporation
            });
    
            const user = await userSchema.findOne({ email: email });
            const id = user.id;
            const username = user.name;
    
            const token = jwt.sign({ email: user.email }, process.env.USER_ACCESS_SECRET, {
                expiresIn: 6000
            });
    
            return res.status(200).json({
                status: "success",
                message: "Registration is successful",
                token: token,
                user: { id, username, email }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "Error",
                message: "Internal Server Error"
            });
        }
    },
    
// <-------------------->Login Section<----------------->

    userlogin:async(req,res)=>{
        const {value,error}=joiUserSchema.validate(req.body)
        console.log(value,"val")
        if(error){
            return res.json(error.message)
        }
        const {email,password}=value
        const user =await userSchema.findOne({
            email:email,
        })
        const id=user.id
        const name=user.name
        if(!user){
        return res.status(404).json({
            status:"errror",
            message:"User not found"
        })
        }
        if(!password || !user.password){
            return res.status(400).json({
                status:"error",
                message:"invalid input"
            })
        }
        const passwordmatch=await bcrypt.compare(password,user.password)
        if(!passwordmatch){
            return res.status(401).json({
                status:"error",
                message:"incorrect password"
            })
        }
        
        const Token=jwt.sign({email:user.email},process.env.USER_ACCESS_SECRET,{
            expiresIn:6000
        })
        res.status(200).json({
            status:"success",
            message:"Login Successfull",
            token:Token,
            data:{id,email,name }
        })
        },


googleLogin:async(req,res)=>{
    const {email, displayName}=req.body 
    console.log(req.body)
  try {
    const existUser=await userSchema.findOne({email:email})
    if(existUser){
      const Token=jwt.sign({email:existUser.email},process.env.USER_ACCESS_SECRET,
      { expiresIn:8500})
        res.status(201).json({
          status:"success",
          message:"Login success",
          data:Token,
          userid:existUser
        })
    }
    if(!existUser){
      const user=new UserSchema({username: displayName,email:email})
      await user.save()
      const Token=jwt.sign({email:existUser.email},process.env.USER_ACCESS_SECRET,
        { expiresIn:8500})
    const ExistUser=await userSchema.findOne({email:email})
  
      res.status(203).json({message:'user Loggined successfully', data:Token, 
      userid:ExistUser})
    }
  } catch (error) {
    console.log(error) 
  }
  },

// <-------------------->Add District<----------------->


AddDistricts:async(req,res)=>{
    const userId=req.params.id
    if(!userId){
        res.status(404).json({
            status:"error",
            message:"User Not Found"

        })
}
const district=await DistrictSchema.findById()
if(!district){
    return res.status(404).json({ 
    status: "Failure", 
    message: "District not found" });
}

},


}