const db=require('../config/db');

const getHotels=async (req,res)=>{
    try{
        const [data]=await db.query("SELECT * FROM hotels");
        if (data.length === 0) {
            return res.status(404).json({ message: 'No hotels found' });
        }
        res.status(200).json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

const getHotelByCity=async (req,res)=>{
    try{
        const city=req.params.city;
        if(!city){
            res.status(404).json({ message: 'Provide city name' });
        }
        const [data]=await db.query(`SELECT * FROM hotels WHERE city=?`,[city]);
        if (data.length === 0) {
            return res.status(404).json({ message: 'Oops! City not found...' });
        }
        res.status(200).json(data);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

const postHotel=async (req,res)=>{
    try{
        const {
            id,name, fullAddress, city, state, country, postalCode, latitude, longitude,
            priceMin, priceMax, rating, reviewsCount, ranking, totalHotels, contactEmail,
            contactPhone, contactWebsite, thumbnail, link
        } = req.body;
        if (
            !id || !name || !fullAddress || !city || !state || !country || !postalCode ||
            latitude === undefined || longitude === undefined || priceMin === undefined ||
            priceMax === undefined || rating === undefined || reviewsCount === undefined ||
            ranking === undefined || totalHotels === undefined || !contactEmail ||
            !contactPhone || !contactWebsite || !thumbnail || !link
        ) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const query = `INSERT INTO Hotels 
            (id,name, fullAddress, city, state, country, postalCode, latitude, longitude, 
            priceMin, priceMax, rating, reviewsCount, ranking, totalHotels, contactEmail, 
            contactPhone, contactWebsite, thumbnail, link) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
        const values = [id,name, fullAddress, city, state, country, postalCode, latitude, longitude,
                        priceMin, priceMax, rating, reviewsCount, ranking, totalHotels,
                        contactEmail, contactPhone, contactWebsite, thumbnail, link];
        await db.query(query, values);
        res.status(200).json({ message: 'Hotel Inserted Successfully!' });
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

const updateHotel=async (req,res)=>{
    try{
        const hotelId=req.params.id;
        if(!hotelId){
            res.status(404).json({ message: 'Provide ID' });
        }
        const {
            name, fullAddress, city, state, country, postalCode, latitude, longitude,
            priceMin, priceMax, rating, reviewsCount, ranking, totalHotels, contactEmail,
            contactPhone, contactWebsite, thumbnail, link
        } = req.body;
        if (
            !name && !fullAddress && !city && !state && !country && !postalCode &&
            latitude === undefined && longitude === undefined && priceMin === undefined &&
            priceMax === undefined && rating === undefined && reviewsCount === undefined &&
            ranking === undefined && totalHotels === undefined && !contactEmail &&
            !contactPhone && !contactWebsite && !thumbnail && !link
        ) {
            return res.status(400).json({ error: "At least one field is required for update" });
        }
        let updateFields = [];
        let values = [];
        if (name) { updateFields.push("name = ?"); values.push(name); }
        if (fullAddress) { updateFields.push("fullAddress = ?"); values.push(fullAddress); }
        if (city) { updateFields.push("city = ?"); values.push(city); }
        if (state) { updateFields.push("state = ?"); values.push(state); }
        if (country) { updateFields.push("country = ?"); values.push(country); }
        if (postalCode) { updateFields.push("postalCode = ?"); values.push(postalCode); }
        if (latitude !== undefined) { updateFields.push("latitude = ?"); values.push(latitude); }
        if (longitude !== undefined) { updateFields.push("longitude = ?"); values.push(longitude); }
        if (priceMin !== undefined) { updateFields.push("priceMin = ?"); values.push(priceMin); }
        if (priceMax !== undefined) { updateFields.push("priceMax = ?"); values.push(priceMax); }
        if (rating !== undefined) { updateFields.push("rating = ?"); values.push(rating); }
        if (reviewsCount !== undefined) { updateFields.push("reviewsCount = ?"); values.push(reviewsCount); }
        if (ranking !== undefined) { updateFields.push("ranking = ?"); values.push(ranking); }
        if (totalHotels !== undefined) { updateFields.push("totalHotels = ?"); values.push(totalHotels); }
        if (contactEmail) { updateFields.push("contactEmail = ?"); values.push(contactEmail); }
        if (contactPhone) { updateFields.push("contactPhone = ?"); values.push(contactPhone); }
        if (contactWebsite) { updateFields.push("contactWebsite = ?"); values.push(contactWebsite); }
        if (thumbnail) { updateFields.push("thumbnail = ?"); values.push(thumbnail); }
        if (link) { updateFields.push("link = ?"); values.push(link); }
        values.push(hotelId);
        const query = `UPDATE Hotels SET ${updateFields.join(", ")} WHERE id = ?`;
        const [result] = await db.query(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Hotel not found" });
        }
        res.status(200).json({ message: 'Hotel Updated Successfully!' });
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

const deleteHotel=async (req,res)=>{
    try{
        const id=req.params.id;
        if(!id){
            res.status(404).json({ message: 'Provide ID' });
        }
        await db.query(`DELETE FROM hotels WHERE id=?`,[id]);
        res.status(200).json({ message: 'Hotel Deleted Successfully!' });
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports={getHotels,getHotelByCity,postHotel,updateHotel,deleteHotel};