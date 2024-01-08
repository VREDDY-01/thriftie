import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if(req.method == "POST"){
    const newOrder = new Order({
        email:req.body.email,
        order_id:req.body.oid,
        address:req.body.finalAddress,
        amount:req.body.amount,
        products:req.body.cart,
        userId:req.body.userId
    })
    await newOrder.save();
    res.status(201).json({Message:"Order Successfully Placed",order:newOrder})
  }else{
    res.status(400).json({Message:"This method Not allowed"})
  }
};

export default connectDb(handler);