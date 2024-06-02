"use client";

export default function AsideLayout({
  children,
  aside
}: {
  children: React.ReactNode;
  aside: React.ReactNode;
}) {
  return (
    <>
      {aside}
      {children}
    </>
  );
}
