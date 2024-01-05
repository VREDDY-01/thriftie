import { useRouter } from "next/router";
import React, { useEffect } from "react";
import jwt from "jsonwebtoken";

const Profile = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    jwt.verify(
      token,
      process.env.NEXT_PUBLIC_JWT_SECRET,
      (err) => {
        if (err) {
          router.push("/");
        }
      }
    );
  }, [router.query]);
  return <div>Profile</div>;
};

export default Profile;
