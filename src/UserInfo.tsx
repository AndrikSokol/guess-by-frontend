"use client";

import React from "react";
import { useUserStore } from "./app/stores/zustand.store";
import Link from "next/link";

const UserInfo = () => {
  const { user } = useUserStore();
  if (user) {
    return (
      <Link href="account" className="text-3xl underline">
        {user.username}
      </Link>
    );
  }
};

export default UserInfo;
