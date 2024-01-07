import Razorpay from "razorpay";
import shortid from "shortid";
import connectDb from "@/middleware/mongoose";
import User from "@/models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      subTotal,
      email,
      contact,
      name,
      address,
      pincode,
      state,
      city,
      user,
      cart,
    } = req.body;
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const user_id = User.find({ email: user.email });
    const products = cart;
    const adress_comps = [address, city, state, pincode];
    const final_address = adress_comps.join(",");
    //Pending create an order

    const payment_capture = 1;
    const amount = parseInt(subTotal);
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(400).json({ error: "This Method is not allowed" });
  }
};

export default connectDb(handler);