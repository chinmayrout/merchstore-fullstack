    //a sample product; could be t-shirt or mug or anything

    const mongoose = require("mongoose");
    const {ObjectId} = mongoose.Schema;      //destructuring

    const productSchema = new mongoose.Schema({
    name:{
        type: String,
        trim : true,
        required: true,
        maxlength: 32
    },
    description:{
        type: String,
        trim : true,
        required: true,
        maxlength: 2000
    },
    price:{
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category:{
        type: ObjectId,
        ref: "Category",   //where the taking the things from (linked from previous defined schema)
        required: true
    },
    stock:{
        type: Number
    },
    sold:{
        type: Number,
        default: 0
    },
    photo:{
        data: buffer,   //photo stored in buffer
        contentType: String
    }
    },{timestamps: true})

    module.exports = mongoose.model("Product",productSchema);