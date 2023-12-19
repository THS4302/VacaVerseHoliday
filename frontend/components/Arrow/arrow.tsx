"use client";
import React from "react";
interface ArrowButtonProps {
  direction: "previous" | "next";
}
const ArrowButton: React.FC<ArrowButtonProps> = ({ direction }) => (
  <button
    className={`bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center ${
      direction === "previous" ? "mr-2" : "ml-2"
    }`}
  >
    {direction === "previous" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    )}
  </button>
);

export default ArrowButton;
