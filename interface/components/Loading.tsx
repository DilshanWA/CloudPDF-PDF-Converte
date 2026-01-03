//Loding Screen component to show different operation messages

import React from "react";

interface LoadingScreenProps {
  subtitle?: string;
  className?: string;
  operationtype?: "convert" | "merge" | "compress" | "split" | "protect" | "imageconverter";
}

const operationMessages: Record<NonNullable<LoadingScreenProps["operationtype"]>, string> = {
  convert: "Converting files",
  merge: "Merging files",
  compress: "Compressing files",
  split: "Splitting files",
  protect: "Protecting files",
  imageconverter: "Converting files",
};

export default function LoadingScreen({
  operationtype,
  subtitle = "Please wait to complete your request",
  className = '',
  ...rest
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center gap-6 w-[320px]">
  
        <div className="h-14 w-14 rounded-full border-4 border-gray-200 border-t-red-500 animate-spin" />

        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {operationtype ? operationMessages[operationtype]: "Processing"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
