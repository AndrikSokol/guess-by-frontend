"use client";
import { useUserStore } from "@/app/stores/zustand.store";
import React from "react";

const Page = () => {
  const { user } = useUserStore();
  return (
    <div>
      <h1>Profile</h1>

      <h2>Email: {user.email}</h2>
      <p>Nickname:{user.nickname}</p>
    </div>
  );
};

export default Page;
