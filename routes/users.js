const express = require('express');
const router = express.Router();
const User = require('../models/user')

//Get All users
router.get('/get', async(req,res) =>{
    try{
        const user = await User.find();
        res.json(user);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })}
});
//get users
router.post('/post', async(req,res)=>{
    const user = new User({
        username: req.body.username,
        id_Number: req.body.id_Number
    });
   try{
    const newUser = await user.save();
    res.status(200).json(newUser);
   }
   catch(error){
    res.status(405).json({
        message: error.message
    });
   }
});

module.exports = router;