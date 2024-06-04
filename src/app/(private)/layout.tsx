"use client";

import { AsideBar } from "../components/aside";

export default function AsideLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AsideBar />
      {children}
    </>
  );
}
