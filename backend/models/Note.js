const mongoose = require("mongoose")

const noteSchmea  = new mongoose.Schema({
 fname:{
    type:String,
    required:true,
 },  
 lname:{
    type:String,
    required:true,
 },  
 email:{
    type:String,
    required:true,
 }, 
 mnumber:{
    type:Number,
    required:true,
 }, 
 project:{
    type:String,
    required:true,
 }, 
})

module.exports = mongoose.model("Note",noteSchmea)