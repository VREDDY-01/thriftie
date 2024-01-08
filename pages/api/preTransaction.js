import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async (req, res) => {
  if(req.method == "POST"){
    //Check if cart is tampered
    let product, sumTotal = 0;
    for(let item in req.body.cart){
      sumTotal += req.body.cart[item].price * req.body.cart[item].qty;
      product = await Product.findOne({slug:item})
      if(product.price != req.body.cart[item].price){
        res.status(401).json({error:"Product prices have been updated!Please Redo."});
      }
    }
    if(sumTotal != req.body.amount){
      res.status(401).json({error:"Product prices have been updated!Please Redo."});
    }
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