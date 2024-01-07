import mongoose, { Schema } from "mongoose";

const orderSchema = mongoose.Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        address:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        products:[
            {
                type:Schema.Types.ObjectId,
                ref:"Product"
            }
        ],
        status:{
            type:String,
            default:"Pending"
        }
    },{
        timestamps:true
    }
);

mongoose.models = {};

export default mongoose.model("order",orderSchema);