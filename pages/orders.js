import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async (decoded) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(decoded),
      });
      if (res.status == "200") {
        let a = await res.json();
        setOrders(a.orders);
      } else {
        setOrders([]);
        router.push("/login");
      }
    };
    const token = localStorage.getItem("token");
    if (token) {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
        if (err) {
          localStorage.removeItem("token");
          router.push("/");
        } else {
          getUsers(decoded);
          setVerified(true);
        }
      });
    }else{
      setVerified(false);
      router.push("/")
    }
  }, [router.query]);

  let style = {
    display: "-webkit-box",
    WebkitLineClamp: "7",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  return (
    <>
    {verified && <div className="min-h-screen">
      <h1 className="text-2xl font-semiboldbold text-center p-8">My Orders</h1>
      <div className="container mx-auto ">
        <div className="flex flex-col">
          <div className="overflow-x-auto mx-0 min-w-fit lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-visible">
                <table className=" md:min-w-full  text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 md:text-sm text-xs w-1/5 text-center py-4"
                      >
                        #Order Id
                      </th>
                      <th
                        scope="col"
                        className="px-4 md:text-sm text-xs  text-center py-4"
                      >
                        Items
                      </th>
                      <th
                        scope="col"
                        className="px-4  md:text-sm text-xs text-center py-4"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-4  md:text-sm text-xs text-center py-4"
                      >
                        Purchased on
                      </th>
                      <th
                        scope="col"
                        className="px-4  md:text-sm text-xs text-center py-4"
                      >
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      return (
                        <tr
                          key={order.order_id}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                        >
                          <td className="whitespace-nowrap  md:text-sm text-xs text-center md:p-4 p-1 font-medium">
                            #Oid-{order.order_id}
                          </td>
                          <td className="whitespace-normal md:text-sm text-xs text-justify md:max-w-[15vw] p-1 md:p-4">
                            <div
                              className=" text-center max-w-[30vw]"
                              style={style}
                            >
                              {Object.keys(order.products).length}
                            </div>
                          </td>
                          <td className="whitespace-nowrap md:text-sm text-xs text-center md:p-4 p-1">
                            ₹{order.amount}.0
                          </td>
                          <td className="whitespace-nowrap md:text-sm text-xs text-center p-1 md:p-4">
                            {new Date(order.createdAt).toLocaleDateString("hi-In") +" - " + new Date(order.createdAt).toLocaleTimeString("hi-In")}
                          </td>
                          <td className="whitespace-nowrap md:text-sm text-xs text-center p-1 md:p-4">
                            <Link href={`/order/${order.order_id}`}>
                              <button className="flex m-auto  text-white bg-orange-500 border-0 py-1 px-1 md:px-2 md:text-md text-xs md:font-semibold focus:outline-none hover:bg-orange-600 rounded">
                                View Details
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default Orders;
