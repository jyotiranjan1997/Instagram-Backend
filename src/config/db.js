const mongoose = require("mongoose");
const DB = process.env.DB_URL;
const connect = async () => {
    try {
        await mongoose.connect(DB);
        console.log("DB Connection scuccess...")
        
    } catch (err) {
        console.log("DB Connection failed...",err);
    }
}

module.exports={connect}