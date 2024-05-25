"use client";

import { Aside } from "../components/aside";

export default function AsideLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
