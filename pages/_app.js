import "@/styles/globals.css";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [charges, setCharges] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        setSubTotal(JSON.parse(localStorage.getItem("subt")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, []);

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let myCart = cart;
    if (itemCode in cart) {
      myCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      myCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(myCart);
    saveCart(myCart);
    setCharges(60);
  };
  const removeFromCart = (itemCode, qty) => {
    let myCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      myCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (myCart[itemCode].qty <= 0) {
      delete myCart[itemCode];
    }
    setCart(myCart);
    if(Object.keys(myCart)>0){
      saveCart(myCart);
    }else{
      clearCart();
    }
  };

  const clearCart = ()=>{
    localStorage.removeItem("cart");
  }

  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    let subt = 0;
    let keys = Object.keys(cart);
    

    for (let i = 0; i < keys.length; i++) {
      subt += newCart[keys[i]].price * newCart[keys[i]].qty;
    }
    localStorage.setItem("subt",subt);
    setSubTotal(subt);
  };
  
  return (
    <>
      <Navbar cart={cart} />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        subTotal={subTotal}
        charges={charges}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
