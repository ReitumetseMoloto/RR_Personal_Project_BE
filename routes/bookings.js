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
  
// Define an API endpoint for updating bookings
router.put('/bookings/:id', async (req, res) => {
    try {
      const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(booking);
    } catch (err) {
      res.status(500).send(err);
    }
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
        email: req.body.email,
        civic_Service: req.body.civic_Service,
        date: req.body.date
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
router.delete('/:IDNumber', async(req,res)=>{
    try{
        const removeBooking = await Booking.deleteOne({id_Number: req.params.IDNumber})
        res.json(removeBooking);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
})

module.exports = router;