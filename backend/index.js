const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const cors = require("cors")
const note_route = require("./routes/note")

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors())
app.use("/api",note_route)

mongoose.connect("mongodb://localhost:27017/CRUD").then(()=>{
  console.log("Database is connected")
 
}).catch((error)=>{ 
 console.log(error)
})




const PORT = 5000

app.get("/",(req,res)=>{
  res.json({message:"hello world"})
})

app.listen(PORT,()=>{
    console.log(`backend listening on port no: ${PORT}`);
})