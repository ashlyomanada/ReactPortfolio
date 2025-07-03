import React from "react";

const Button = ({ children }) => {
  return (
    <button className="px-4 py-2 bg-teal-800 rounded-md shadow-md text-white hover:bg-teal-700">
      {children}
    </button>
  );
};

export default Button;
