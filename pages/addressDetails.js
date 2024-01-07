import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

const AddressDetails = ({ cart,subTotal }) => {
  const [user, setuser] = useState({});
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setaddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const handleChange = (e)=>{
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    else if (e.target.name == "address") {
      setaddress(e.target.value);
    }
    else if (e.target.name == "contactNumber") {
      setContact(e.target.value);
    }
    else if (e.target.name == "city") {
      setCity(e.target.value);
    }
    else if (e.target.name == "state") {
      setState(e.target.value);
    }
    else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err) => {
        if (err) {
          localStorage.removeItem("token");
          router.push("/");
        } else {
          setuser(localStorage.getItem("user"));
        }
      });
    }
  }, [router.query]);

  const makePayment = async (e) => {
    e.preventDefault();
    console.log("here...");
    const res = await initializeRazorpay();
    const formBody = { subTotal,email,contact,name,address,pincode,state,city,user,cart};

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("http://localhost:3000/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    }).then((t) => t.json());

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Thriftie",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your ordering.",
      image: "/logo.png",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.contactNumber,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  return (
    <form
      className="text-gray-600 body-font relative"
      method="POST"
      onSubmit={makePayment}
    >
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-5">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Checkout
          </h1>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <h2 className="font-bold py-5">Delivery Details</h2>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                onChange={handleChange}
                  value={name}
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                onChange={handleChange}
                  value={email}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="address"
                  className="leading-7 text-sm text-gray-600"
                >
                  Address
                </label>
                <textarea
                onChange={handleChange}
                value={address}
                  id="address"
                  name="address"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-16 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="contactNumber"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone
                </label>
                <input
                onChange={handleChange}
                  value={contact}
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="city"
                  className="leading-7 text-sm text-gray-600"
                >
                  City
                </label>
                <input
                onChange={handleChange}
                  value={city}
                  type="text"
                  id="city"
                  name="city"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="state"
                  className="leading-7 text-sm text-gray-600"
                >
                  State
                </label>
                <input
                onChange={handleChange}
                  value={state}
                  type="text"
                  id="state"
                  name="state"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="pincode"
                  className="leading-7 text-sm text-gray-600"
                >
                  PinCode
                </label>
                <input
                onChange={handleChange}
                  value={pincode}
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>
          <input type="hidden" value={subTotal} />
          <button
            type="submit"
            className="my-16 group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
          >
            Pay {subTotal}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddressDetails;
