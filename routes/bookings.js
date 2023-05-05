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

//total number of male ans females 
router.get('/total-gender', async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: "$gender",
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: null,
            Male: { $sum: { $cond: [{$eq: ["$_id", "Male"]}, "$count", 0] } },
            Female: { $sum: { $cond: [{$eq: ["$_id", "Female"]}, "$count", 0] } }
          }
        }
      ];
  
      const result = await Booking.aggregate(pipeline);
  
      res.json(result[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

//Get Month
router.get('/getMonth', async (req, res) => {
    try {
        const bookings = await Booking.find();
        const bookingsByMonth = bookings.reduce((acc, booking) => {
          const month = new Date(booking.dateTime).getMonth();
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});
        const bookingsData = Object.entries(bookingsByMonth).map(([month, count]) => {
          return { month: parseInt(month), count };
        });
        res.json(bookingsData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
        
);

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