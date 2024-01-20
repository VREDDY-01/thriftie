import ProductList from "@/components/ProductsList/productList";
import Product from "@/models/Product";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const Products = () => {
  const [products, setproducts] = useState({});
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("stoken");
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, async(err, decoded) => {
      if (err) {
        router.push("/seller/login");
      } else {
        getSelletProducts(decoded.id);
      }
    });
  }, []);

  const getSelletProducts = async(sellerId)=>{
    const resBody = {sellerId};
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/seller/getSellerProducts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resBody),
      }
    );
    const a = await res.json();
    if (res.status == "200") {
      let prods = a.products;
        let finalProds = {};
        for (let item of prods) {
          if (item.title in finalProds) {
            if (
              !finalProds[item.title].color.includes(item.color) &&
              item.availableQty > 0
            ) {
              finalProds[item.title].color.push(item.color);
            }
            if (
              !finalProds[item.title].size.includes(item.size) &&
              item.availableQty > 0
            ) {
              finalProds[item.title].size.push(item.size);
            }
          } else {
            finalProds[item.title] = JSON.parse(JSON.stringify(item));
            if (item.availableQty > 0) {
              finalProds[item.title].color = [item.color];
              finalProds[item.title].size = [item.size];
            } else {
              finalProds[item.title].color = [];
              finalProds[item.title].size = [];
            }
          }
        }
        setproducts(finalProds);
    }else{
      setproducts({});
    };
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="flex flex-col items-center justify-center h-full mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-l md:text-3xl text-gray-950 dark:text-gray-900 my-3">
            All Products
          </p>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
};

export default Products;
