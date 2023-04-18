const express = require('express');
const router = express.Router();
const Booking = require('../models/booking')

//Get All bookings
router.get('/get', async(req,res) =>{
    try{
        const booking = await Booking.find();
        res.json(booking);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })}
});

//Get by id
router.get('/:getbyId', async(req,res) =>{
    try{
        const booking = await Booking.findById(req.params.getbyId)
        res.json(booking);
    }
    catch(error){
        res.status(500).json({
           message: error.message
              });
    }
})

//add Booking
router.post('/post', async(req,res)=>{
    const booking = new Booking({
        first_Name: req.body.first_Name,
        last_Name: req.body.last_Name,
        id_Number: req.body.id_Number,
        gender: req.body.gender,
        cellphone_Number: req.body.cellphone_Number,
        email: req.body.cellphone_Number,
        dateTime: req.body.dateTime 
    });
   try{
    const newBooking = await booking.save();
    res.status(200).json(newBooking);
   }
   catch(error){
    res.status(405).json({
        message: error.message
    });
   }
});

//delete booking
router.delete('/:deletebyId', async(req,res)=>{
    try{
        const removeBooking = await Booking.deleteOne({_id: req.params.deletebyId})
        res.json(removeBooking);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
})

module.exports = router;