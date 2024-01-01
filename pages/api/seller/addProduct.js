import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const {title,desc,img,category,size,color,price,availableQty} = req.body;
        const slug = `${title}-${size}-${color}`;
        const newProd = new Product({
            title,slug:slug,desc,img,category,size,color,price,availableQty
        });
        await newProd.save();
        res.status(201).json({message:"New Product added Succesfully",product:newProd});
    }else{
        res.status(400).json({error:"This Method is not allowed"});
    }

}

export default connectDb(handler);
  