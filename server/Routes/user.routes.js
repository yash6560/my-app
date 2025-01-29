const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const router = express.Router();

router.post('/register', async (req,res) => {
    const {name, email, password} = req.body;
    try {
        const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).json({message : "User Already Exist", success: false});
    }

    const hashPass = await bcrypt.hash(password,10)
    const userdata = await User.create({name, email, password:hashPass});
    return res.status(200).json({message:"User register", success:true,userdata});
    } catch (error) {
        return res.status(500).json({message:"User not register", success:false});
    }
    
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email});
        if (!userExist) {
            return res.status(404).json({ message: "Invalid Credentials", success: false });
        }
        const checkPass = await bcrypt.compare(password,userExist.password);
        if(!checkPass){
            return res.status(404).json({ message: "Invalid Credentials", success: false });      
        }
        const token = await jwt.sign({ id: userExist._id, email: userExist.email }, "userExistLogin@!#", { expiresIn: '5h' })
        return res.status(200).json({ message: "Login successful", success: true, token, user:userExist })
        } catch (error) {
            return res.status(500).json({ message: "Login failed", success: false, error: error.message });
    }
})

module.exports = router;