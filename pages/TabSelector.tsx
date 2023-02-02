import * as React from "react";

export const TabSelector = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    className={`mr-8 text-black group inline-flex items-center px-2 py-4 border-b-2 font-semibold uppercase leading-5 cursor-pointer whitespace-nowrap ${
      isActive
        ? "border-indigo-900 text-black focus:outline-none focus:text-indigo-800 focus:border-indigo-900"
        : "border-transparent text-black hover:text-gray-600 hover:border-gray-300 focus:text-gray-600 focus:border-gray-300"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);