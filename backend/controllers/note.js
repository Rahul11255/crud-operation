const Note = require("../models/Note")
const { ObjectId } = require("mongodb");

const createNote = async (req,res)=>{
    try{
        const newNote = new Note({
         fname:req.body.fname,
         lname:req.body.lname,
         email:req.body.email,
         mnumber:req.body.mnumber,
         project:req.body.project,
        });
        const note = await newNote.save()
        res.status(200).json(note);
    }catch(error){
        res.status(500).json(error)
    }
}

// get note
const getNote = async (req,res)=>{
    try{
        const note = await Note.find({})
        res.status(200).json(note);
    }catch(error){
        res.status(500).json(error)
    }
}

const deletNotes = async (req, res, next) => {
    try {
      const result = await Note.deleteOne({ _id: new ObjectId(req.params.id) });
      res.json(result);
    } catch (err) {
      next(err);
    }
    
};

const updateNote = async (req, res, next) => {
    try {
      const  id = req.params.id;
      const noteExist = await Note.findById(id);
      if(!noteExist){
        return res.status(401).json({msg:"note not found"});
      }
      const updateData = await Note.findByIdAndUpdate(id,req.body,{new:true});
      
      res.json(updateData);
    } catch (err) {
      next(err);
    }
  };


  const getSingleNote = async (req, res, next) => {
    try {
      const  id = req.params.id;
      const data = await Note.findById(id);
      res.json(data);
    } catch (err) {
      next(err);
    }
  };





module.exports = {createNote,getNote,deletNotes,updateNote ,getSingleNote}