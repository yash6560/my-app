const express = require('express');
const Notes = require('../models/notes.model');
const AuthenticateUser = require('../middleware/AuthenticateUser');

const router = express.Router();

router.post('/notes', AuthenticateUser, async (req, res) => {
    
    try {
        const {title, desc} = req.body;
        const addNote = await Notes.create({title, desc, userId: req.user.id});
        return res.status(200).json({message:"Note Saved!", success : true,addNote});
    } catch (error) {
        console.error("Error saving note:", error.message);
        return res.status(500).json({message:error.message, success : false}); 
    }
})

router.get('/notes',AuthenticateUser, async (req,res) => {
    try {
        const getdata = await Notes.find({userId:req.user.id});
        return res.status(200).json({message:"get all data", success : true,getdata});
    } catch (error) {
        return res.status(500).json({message:error.message, success : false}); 
    }
})

router.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    console.log("id", id);
    try {
        const updateNote = await Notes.findByIdAndUpdate(id,req.body,{ new: true });
        return res.status(200).json({message:"Note Saved!", success : true,updateNote});
    } catch (error) {
        console.error("Error saving note:", error.message);
        return res.status(500).json({message:error.message, success : false}); 
    }
})

router.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteNote = await Notes.findByIdAndDelete(id);
        return res.status(200).json({message:"Note id deleted!", success : true});
    } catch (error) {
        console.error("Error saving note:", error.message);
        return res.status(500).json({message:error.message, success : false}); 
    }
})

module.exports = router