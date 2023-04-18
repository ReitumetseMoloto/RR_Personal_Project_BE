require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');

//DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
    db.on('error',function(error){
    console.error(error);
});
    db.once("open",function(){
    console.log('Connected to database');
})

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//IMPORT ROUTES 
app.use(bodyParser.json());
const bookingRoute = require("./routes/bookings");
app.use("/bookings", bookingRoute);

app.use(bodyParser.json());
const userRoute = require("./routes/users");
app.use("/users", userRoute);

//LISTENING TO SERVER
const port = 3000;
app.listen(port,function(){
    console.log(`Listening on port number: ${port}`);
});