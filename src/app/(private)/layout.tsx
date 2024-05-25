"use client";

import { Aside } from "../components/aside";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <Aside></Aside>
      {children}
    </main>
  );
}
