"use client";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { setUser } from "@/store/authSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/auth/me");

        console.log("ME:", res);

        dispatch(setUser(res.data.data));
      } catch (error: any) {
        console.log("ME ERROR:", error.response?.data || error.message);
      }
    };

    fetchMe();
  }, [dispatch]);

  return <>{children}</>;
}
