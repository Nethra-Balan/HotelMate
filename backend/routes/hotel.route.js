const express=require('express');
const {getHotels,getHotelByCity,postHotel,updateHotel,deleteHotel} = require('../controller/hotel.controller');
const router=express.Router();

router.get('/',getHotels);
router.get('/:city',getHotelByCity);
router.post('/',postHotel);
router.put('/:id',updateHotel);
router.delete('/:id',deleteHotel);

module.exports=router;