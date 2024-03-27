require("dotenv").config();
const express=require("express")
const app=express()
const port=3004
const mongoose=require("mongoose")
const userRoute=require("./routes/UserRoute")

mongoDB=process.env.MONGOOSE_URL

main().catch((err) => console.log(err))
async function main() {
  await mongoose.connect(mongoDB);
  console.log("db connected");
}

app.use(express.json())

app.use('/api/user',userRoute)


app.listen(port,(err)=>{
    console.log(`server successfully connected to port:${port}`)
})