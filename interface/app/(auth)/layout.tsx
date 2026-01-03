'use client'
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full justify-center w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex min-h-screen flex-col w-full">
        <div className="mx-auto flex flex-1 items-center justify-center  w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
