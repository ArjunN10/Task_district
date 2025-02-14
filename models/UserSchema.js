const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber:String,
    date_of_birth:String,
    assembly:String,
    constituency:String,
    district:String,
    panchayath:String,
    municipality:String,
    corporation:String,
      
  });
  

userSchema.pre("save", async function (next) { 
    const user = this;
    if (!user.isModified("password")) return next();

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

module.exports = mongoose.model("user", userSchema);  
