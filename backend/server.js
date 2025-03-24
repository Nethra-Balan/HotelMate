require('dotenv').config();
const express = require('express');
const cors = require('cors');
const hotelRoute = require('./routes/hotel.route');
<<<<<<< HEAD
const userRoute = require('./routes/user.route');
=======
>>>>>>> f7d7c27 (Initial commit)

const app = express();
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(express.urlencoded({extended:true}));

app.use('/api/hotels', hotelRoute);
app.use('/api/users',userRoute);
=======

app.use('/api/hotels', hotelRoute);
>>>>>>> f7d7c27 (Initial commit)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
