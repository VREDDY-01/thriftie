import mongoose, { Schema } from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    slug: {
        type:String,
        required:true
    },
    desc: {
        type:String,
        required:true
    },
    img: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    size: {
        type:String
    },
    color: {
        type:String
    },
    price: {
        type:String,
        required:true
    },
    availableQty: {
        type:String,
        required:true
    },
    seller:{
        type:Schema.Types.ObjectId,
        ref:"Seller"
    }   
});

mongoose.models = {};
export default mongoose.model("product",ProductSchema)