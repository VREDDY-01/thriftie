import React, { useEffect } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";

const Dashboard = () => {
    const router = useRouter();
  useEffect(() => {
    const stoken = localStorage.getItem("stoken");
    if (stoken) {
      jwt.verify(stoken, process.env.NEXT_PUBLIC_JWT_SECRET, (err) => {
        if (err) {
          localStorage.removeItem("token");
          router.push("/seller/login");
        }
      });
    }else{
        router.push("/seller/login");
    }
  }, [router.query]);
  return <div>Dashboard</div>;
};

export default Dashboard;
