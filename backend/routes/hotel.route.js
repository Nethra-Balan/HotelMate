const express=require('express');
<<<<<<< HEAD
const {getHotels,getHotelByCity,getHotelById,postHotel,updateHotel,deleteHotel,getHotelPhotosById,getHotelAmenitiesById,postAdmin,loginAdmin} = require('../controller/hotel.controller');
const router=express.Router();

router.get('/',getHotels);
router.get('/city/:city',getHotelByCity);
router.get('/id/:id',getHotelById);
router.post('/',postHotel);
router.put('/:id',updateHotel);
router.delete('/:id',deleteHotel);
router.get('/photos/:id',getHotelPhotosById);
router.get('/amenities/:id',getHotelAmenitiesById);


router.post('/admin',postAdmin);
router.post('/admin/login',loginAdmin);
=======
const {getHotels,getHotelByCity,postHotel,updateHotel,deleteHotel} = require('../controller/hotel.controller');
const router=express.Router();

router.get('/',getHotels);
router.get('/:city',getHotelByCity);
router.post('/',postHotel);
router.put('/:id',updateHotel);
router.delete('/:id',deleteHotel);
>>>>>>> f7d7c27 (Initial commit)

module.exports=router;