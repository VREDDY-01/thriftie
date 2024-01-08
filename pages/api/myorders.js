import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  const email = req.body.email;
  if (email) {
    let Orders = await Order.find({ email: email });
    res.status(200).json({ orders: Orders });
  } else {
    res.status(401).json({ message: "You are not Authorized!" });
  }
};

export default connectDb(handler);
