import React, { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const Verify = () => {
  const { verifyEmail, msg } = useContext(UserContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (userId && secret) {
      verifyEmail(userId, secret);
    }
  }, [searchParams, verifyEmail]);

  return <div>{msg?.text || "Ellenőrzés folyamatban..."}</div>;
};

