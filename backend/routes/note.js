const express = require("express")
const router  =  express.Router()
const {createNote,getNote,deletNotes,updateNote,getSingleNote}  = require("../controllers/note")

router.route("/create").post(createNote)
router.route("/notes").get(getNote)
router.route("/note/:id").delete(deletNotes)
router.route("/singleNote/:id").get(getSingleNote)
router.route("/update/:id").put(updateNote)

module.exports = router